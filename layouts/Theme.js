import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Theme({ children }) {
  return <div className={children.props.query.color}>
    <Header query={children.props.query} />
    <div>{children}</div>
    <Footer />
  </div>
}