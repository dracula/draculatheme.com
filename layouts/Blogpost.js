import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default ({ children }) => {
  return <div className={children.props.post.color}>
    <div className="blog-wraper">
      <Topbar />
      <div className="blog-content">{children}</div>
      <Footer />
    </div>
  </div>
}