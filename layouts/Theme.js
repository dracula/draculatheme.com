import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children }) => {
  return <div className={children.props.query.color}>
    <div className="container-fluid">
      <Header query={children.props.query} />
      <div>{children}</div>
      <Footer />
    </div>
  </div>
}