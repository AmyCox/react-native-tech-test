import { View, ActivityIndicator } from "react-native";

export const Spinner = ({
  size = "large",
  color,
  animating = true,
}: {
  size: React.ComponentProps<typeof ActivityIndicator>["size"];
  color: React.ComponentProps<typeof ActivityIndicator>["color"];
  animating: React.ComponentProps<typeof ActivityIndicator>["animating"];
    testID: React.ComponentProps<typeof ActivityIndicator>["testID"];
}) => {
  return (
    <ActivityIndicator
      size={size}
      color={color || "#004E7A"}
      animating={animating}
      accessibilityLabel="Loading"
      accessibilityHint="This is a loading spinner indicating that content is being loaded."
    />
  );
};

export const CenteredSpinner = ({
  size,
  color,

}: {
  size: React.ComponentProps<typeof ActivityIndicator>["size"];
  color: React.ComponentProps<typeof ActivityIndicator>["color"];
}) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Spinner size={size} color={color} animating testID="loading-spinner"/>
  </View>
);

export default Spinner;
