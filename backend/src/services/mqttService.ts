import mqtt from "mqtt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MQTT_BROKER_HIVEMQ_URL =
  process.env.MQTT_BROKER_HIVEMQ_URL || "mqtt://broker.hivemq.com";
const MQTT_TOPIC = process.env.MQTT_TOPIC || "aiflux/test_topic";

class MQTTService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(MQTT_BROKER_HIVEMQ_URL);
  }

  connectAndSubscribe() {
    this.client.on("connect", () => {
      console.log(`Connected to MQTT broker at ${MQTT_BROKER_HIVEMQ_URL}`);
      this.client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
          console.error(`Failed to subscribe to topic ${MQTT_TOPIC}:`, err);
        } else {
          console.log(`Subscribed to topic ${MQTT_TOPIC}`);
        }
      });
    });

    this.client.on("message", async (topic, message) => {
      try {
        const temperatureValue = parseFloat(message.toString());
        if (isNaN(temperatureValue)) {
          console.log(
            `Received invalid temperature value: ${message.toString()}`
          );
          return;
        }

        await prisma.temperature.create({
          data: {
            value: temperatureValue,
          },
        });

        console.log(`Stored temperature: ${temperatureValue}°C`);
      } catch (error) {
        console.error("Error storing temperature data:", error);
      }
    });

    this.client.on("error", (err) => {
      console.error("MQTT Client Error:", err);
      this.client.end();
    });
  }
}

export default new MQTTService();
