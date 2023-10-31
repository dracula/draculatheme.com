import CustomSelect from "src/components/customSelect";

const SizeSelect = ({ options, defaultVariant, setSelectedOption }) => {
  const styles = {
    control: {
      minHeight: "2.875rem",
    },
  };
  const themeColors = {
    neutral0: "var(--background-color-02)",
    neutral10: "var(--color)",
    neutral20: "var(--neutral-05)",
    neutral30: "var(--neutral-04)",
    neutral40: "var(--color)",
    neutral60: "var(--color)",
    neutral80: "var(--color)",
    primary: "var(--color)",
    primary25: "var(--background-color-01)",
    primary50: "var(--background-color-01)",
  };

  return (
    <div className="size-select">
      <label htmlFor="size">Size:</label>
      <CustomSelect
        instanceId="size"
        options={options}
        defaultIndex={defaultVariant}
        setSelectedOption={setSelectedOption}
        styles={styles}
        themeColors={themeColors}
      />
    </div>
  );
};

export default SizeSelect;
