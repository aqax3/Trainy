declare module "@react-native-community/masked-view" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  export interface MaskedViewProps extends ViewProps {
    maskElement: JSX.Element;
  }

  const MaskedView: ComponentType<MaskedViewProps>;
  export default MaskedView;
}
