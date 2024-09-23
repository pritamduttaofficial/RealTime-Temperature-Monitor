import paho.mqtt.client as mqtt

# MQTT Broker details
broker = 'broker.hivemq.com'  # Public MQTT broker
port = 1883
topic = 'aiflux/test_topic'

# Callback function when a message is received
def on_message(client, userdata, msg): 
    print(f"Received message '{msg.payload.decode()}' on topic '{msg.topic}'")

# Create a new MQTT client instance
client = mqtt.Client()

# Set the on_message callback function
client.on_message = on_message

# Connect to the broker
client.connect(broker, port)

# Subscribe to the topic
client.subscribe(topic)

print(f"Subscribed to topic '{topic}'")

# Start the loop to process received messages
client.loop_forever()
