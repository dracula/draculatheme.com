import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children }) => {
  return <div className={children.props.query.color}>
    <Header query={children.props.query} />
    <div>{children}</div>
    <Footer />
  </div>
}