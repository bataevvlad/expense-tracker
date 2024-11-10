#!/bin/bash

# Prompt user for component name
echo "Enter the component name:"
read component_name

# Check if the component name is not empty
if [ -z "$component_name" ]; then
  echo "Component name cannot be empty."
  exit 1
fi

# Run the nx generate component command with the specified component name
npx nx g @nx/react-native:component "libs/components-library/src/lib/$component_name/$component_name" --export

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Component '$component_name' created and exported successfully."
else
  echo "Failed to create component '$component_name'. Please check for errors above."
fi
