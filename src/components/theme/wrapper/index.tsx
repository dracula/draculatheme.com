import Info from "../info";
import Main from "../main";

const Wrapper = ({ query, markdown, contributors }) => (
  <div className="wrapper">
    <div className="main">
      <Main theme={query.repo} markdown={markdown} />
    </div>
    <Info theme={query.repo} contributors={contributors} />
  </div>
);

export default Wrapper;
