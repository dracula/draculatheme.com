import Select from "react-select";

const SizeSelect = ({ options, defaultVariant, setSelectedOption }) => {
  return (
    <div className="size-select">
      <label htmlFor="size">Size:</label>
      <Select
        instanceId={"size"}
        defaultValue={options[defaultVariant]}
        options={options}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
        }}
        isSearchable={true}
        styles={{
          option: (styles) => ({
            ...styles,
            cursor: "pointer",
            borderRadius: "var(--radius-01)",
          }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
            border: ".125rem solid var(--neutral-05)",
            borderRadius: "var(--radius-01)",
          }),
          menu: (styles) => ({
            ...styles,
            padding: ".5rem",
            borderRadius: "var(--radius-01)",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          cursor: "pointer",
          colors: {
            ...theme.colors,
            neutral0: "var(--background-color-02)", // Closed - Background
            neutral10: `var(--color)`, // Closed - Arrow
            neutral20: `var(--neutral-05)`, // Closed - Border
            neutral30: `var(--neutral-04)`, // Closed - Border Hover
            neutral40: `var(--color)`, // Closed - Arrow Hover
            neutral60: `var(--color)`, // Opened - Arrow
            neutral80: `var(--color)`, // Closed - Text
            primary: `var(--color)`, // Opened - Border
            primary25: "var(--background-color-01)", // Opened - Active
            primary50: "var(--background-color-01)", // Opened - Focus
          },
        })}
      />
    </div>
  );
};

export default SizeSelect;
