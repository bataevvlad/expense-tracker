#!/bin/bash

# Prompt user for component name
echo "Enter the Util name:"
read util_name

# Check if the component name is not empty
if [ -z "$util_name" ]; then
  echo "Util name cannot be empty."
  exit 1
fi

# Run the nx generate component command with the specified component name
npx nx g @nx/react-native:component "libs/shared-utils/src/$util_name/$util_name" --export --verbose

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Service '$util_name' created and exported successfully."
else
  echo "Failed to create service '$util_name'. Please check for errors above."
fi
