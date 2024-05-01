import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CustomSelect = ({
  options,
  defaultIndex,
  setSelectedOption,
  instanceId,
  styles,
  themeColors
}) => {
  return (
    <Select
      instanceId={instanceId}
      defaultValue={options[defaultIndex]}
      options={options}
      onChange={(selectedOption) => setSelectedOption(selectedOption)}
      isSearchable={true}
      styles={{
        option: (provided) => ({
          ...provided,
          cursor: "pointer",
          borderRadius: "var(--radius-01)",
          ...styles.option
        }),
        control: (provided) => ({
          ...provided,
          cursor: "pointer",
          border: ".125rem solid var(--neutral-05)",
          borderRadius: "var(--radius-01)",
          ...styles.control
        }),
        menu: (provided) => ({
          ...provided,
          padding: ".5rem",
          borderRadius: "var(--radius-01)",
          ...styles.menu
        })
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        cursor: "pointer",
        colors: {
          ...theme.colors,
          ...themeColors
        }
      })}
      className="select"
      classNamePrefix="react-select"
    />
  );
};

export default CustomSelect;
