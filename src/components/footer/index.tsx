import "./index.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="lx-col is-5 col-title">
          <span className="title p">Dracula Theme</span>
          <span>
            The most famous dark theme ever created and available everywhere.
          </span>
          <span>
            Made with 💜 by{" "}
            <Link href="https://zenorocha.com/" target="_blank">
              <span>Zeno Rocha</span>
            </Link>{" "}
            and{" "}
            <Link href="https://luxonauta.com/" target="_blank">
              <span>Luxonauta</span>
            </Link>
          </span>
        </div>
        <div className="lx-col col-projects">
          <span className="title t">Projects</span>
          <ul>
            <li>
              <Link href="/">
                <span>Dracula Theme</span>
              </Link>
            </li>
            <li>
              <Link href="/pro">
                <span>Dracula PRO</span>
              </Link>
            </li>
            <li>
              <Link href="https://ui.draculatheme.com/" target="_blank">
                <span>Dracula UI</span>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <span>Dracula Shop</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="lx-col col-resources">
          <span className="title t">Resources</span>
          <ul>
            <li>
              <Link href="/blog">
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/contribute">
                <span>Contribute</span>
              </Link>
            </li>
            <li>
              <Link href="/open">
                <span>Open Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="https://spec.draculatheme.com/" target="_blank">
                <span>Spec</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="lx-col col-community">
          <span className="title t">Community</span>
          <ul>
            <li>
              <Link href="https://twitter.com/draculatheme" target="_blank">
                <span>Twitter</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/dracula/dracula-theme"
                target="_blank"
              >
                <span>Github</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://draculatheme.com/discord-invite"
                target="_blank"
              >
                <span>Discord</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.reddit.com/r/draculatheme"
                target="_blank"
              >
                <span>Reddit</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://en.wikipedia.org/wiki/Dracula_(color_scheme)"
                target="_blank"
              >
                <span>Wikipedia</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
