import CustomSelect from "src/components/customSelect";
import apps from "src/lib/pro";

const SelectComponent = ({ setSelectedOption }) => {
  const styles = {
    control: {
      border: "0.125rem solid var(--yellow)"
    }
  };

  const themeColors = {
    neutral0: "var(--background-color-02)",
    neutral10: "var(--yellow)",
    neutral20: "var(--yellow)",
    neutral30: "var(--yellow)",
    neutral40: "var(--yellow)",
    neutral60: "var(--yellow)",
    neutral80: "var(--yellow)",
    primary: "var(--yellow)",
    primary25: "var(--background-color-01)",
    primary50: "var(--background-color-01)"
  };

  return (
    <CustomSelect
      instanceId="theme"
      options={apps}
      defaultIndex={apps.length - 4}
      setSelectedOption={setSelectedOption}
      styles={styles}
      themeColors={themeColors}
    />
  );
};

export default SelectComponent;
