import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import styles from "./PlatformToggle.module.css";

export default ({ onFilter }) => {
	const [selected, setSelected] = React.useState("all");

	const options = [
		{ label: "All", value: "all" },
		{ label: "Mac", value: "mac" },
		{ label: "Linux", value: "linux" },
		{ label: "Windows", value: "windows" },
	];

	return (
		<ToggleGroup.Root
			type="single"
			className={styles.buttonGroup}
			value={selected}
			aria-label="Platform Toggle"
			onValueChange={(selected) => {
				if (selected) setSelected(selected);
				onFilter(selected);
			}}
		>
			{options.map(({ label, value }) => (
				<ToggleGroup.Item
					key={value}
					value={value}
					className={selected === value ? styles.buttonSelected : styles.button}
				>
					{label}
				</ToggleGroup.Item>
			))}
		</ToggleGroup.Root>
	);
};
