import { Button, Rows, Text, TextInput } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";

export const App = () => {
  const [value, setValue] = React.useState("Start by typing something");

  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: ["Hello world!"],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>Change your animation styles</Text>
        <TextInput value={value} onChange={(v) => setValue(v)}></TextInput>
        <Button variant="primary" onClick={onClick} stretch>
          Add Master Element
        </Button>
      </Rows>
    </div>
  );
};
