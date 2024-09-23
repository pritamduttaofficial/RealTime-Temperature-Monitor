import paho.mqtt.client as mqtt
import time
import random

# MQTT Broker details
broker = 'broker.hivemq.com'  # Public MQTT broker
port = 1883
topic = 'aiflux/test_topic'

# Create a new MQTT client instance
client = mqtt.Client()

# Connect to the broker
client.connect(broker, port)

while True:
    
    # Generating a random temperature
    temperature = str(random.randint(30, 35))

    # Adding a delay of 2 seconds before publishing the message
    time.sleep(2)
    
    # Publish a message
    client.publish(topic, temperature)

    print(f"Published '{temperature}' to topic '{topic}'")

# Disconnect from the broker
client.disconnect()
