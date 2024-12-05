#!/bin/bash

# Prompt user for component name
echo "Enter the Service name:"
read service_name

# Check if the component name is not empty
if [ -z "$service_name" ]; then
  echo "Service name cannot be empty."
  exit 1
fi

# Run the nx generate component command with the specified component name
npx nx g @nx/react-native:component "libs/services/src/lib/$service_name/$service_name" --export --verbose

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Service '$service_name' created and exported successfully."
else
  echo "Failed to create service '$service_name'. Please check for errors above."
fi
