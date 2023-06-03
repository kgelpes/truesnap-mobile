import {
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
} from "expo-router";

export default function Layout() {
  // Render the children routes now that all the assets are loaded.
  return <Slot />;
}
