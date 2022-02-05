import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import convert from "color-convert";
import Theme from "../layouts/Theme";
import ProCta from "../components/ProCta";
import styles from "./contribute.module.css";

const SelectInput = dynamic(() => import("react-select"), { ssr: false });

export async function getStaticProps() {
	const query = {
		title: "Contribute",
		color: "pink",
		icon: "used/pack-1/045-dracula.svg",
	};
	return { props: { query } };
}

class Contribute extends React.Component {
	state = {
		tooltip: "Copy",
		colorType: { value: "hex", label: "HEX" },
		colors: [
			{ value: "#282a36", label: "Background" },
			{ value: "#44475a", label: "Current Line" },
			{ value: "#f8f8f2", label: "Foreground" },
			{ value: "#6272a4", label: "Comment" },
			{ value: "#8be9fd", label: "Cyan" },
			{ value: "#50fa7b", label: "Green" },
			{ value: "#ffb86c", label: "Orange" },
			{ value: "#ff79c6", label: "Pink" },
			{ value: "#bd93f9", label: "Purple" },
			{ value: "#ff5555", label: "Red" },
			{ value: "#f1fa8c", label: "Yellow" },
		],
	};

	renderFaq() {
		return (
			<div className={styles.faq}>
				<h3>FAQ</h3>
				<p>
					<strong>Are you going to create a light color scheme?</strong>
				</p>
				<p>Nope. Dracula can't stand the light.</p>

				<p>
					<strong>Are you going to support app X?</strong>
				</p>
				<p>
					We hope so, but we need your help to accomplish that. Since you're already
					using app X you're probably much more experienced on it than us. So give it
					a try first!
				</p>

				<p>
					<strong>How do I submit a new theme?</strong>
				</p>
				<ol>
					<li>
						<p>
							Create a new repository based on this{" "}
							<a href="https://github.com/dracula/template">template</a>.
						</p>
					</li>
					<li>
						<p>
							Build the new theme using the <a href="#color-palette">Color Palette</a>{" "}
							below.
						</p>
					</li>
					<li>
						<p>
							Finally,{" "}
							<a href="https://github.com/dracula/dracula-theme/issues/new">
								submit an issue
							</a>{" "}
							with a link to your repository. Once the theme is accepted, we will move
							the repository under the Dracula organization and give you rights to
							maintain it :)
						</p>
					</li>
				</ol>
			</div>
		);
	}

	changeColorType(e) {
		const { colors } = this.state;

		if (e.value === "hex") {
			colors.map((color) => {
				color.convertedValue = color.value;
				return color;
			});
		} else if (e.value === "rgb") {
			colors.map((color) => {
				color.convertedValue = `rgb(${convert.hex.rgb(color.value).join(", ")})`;
				return color;
			});
		} else if (e.value === "hsl") {
			colors.map((color) => {
				color.convertedValue = `hsl(${convert.hex.hsl(color.value).join(", ")})`;
				return color;
			});
		} else if (e.value === "ansi16" || e.value === "ansi256") {
			colors.map((color) => {
				color.convertedValue = convert.hex[e.value](color.value);
				return color;
			});
		}

		this.setState({ colorType: e });
	}

	renderSelect() {
		const colorTypes = [
			{ value: "hex", label: "HEX" },
			{ value: "rgb", label: "RGB" },
			{ value: "hsl", label: "HSL" },
			{ value: "ansi16", label: "ANSI 16" },
			{ value: "ansi256", label: "ANSI 256" },
		];

		return (
			<div className={styles.select}>
				<SelectInput
					id="theme"
					defaultValue={colorTypes[0]}
					options={colorTypes}
					onChange={this.changeColorType.bind(this)}
					isSearchable={true}
					styles={{
						option: (styles, state) => ({
							...styles,
							cursor: "pointer",
						}),
						control: (styles) => ({
							...styles,
							cursor: "pointer",
						}),
					}}
					theme={(theme) => ({
						...theme,
						borderRadius: 0,
						cursor: "pointer",
						colors: {
							...theme.colors,
							primary: "#ff79c6", // Opened - Border
							primary25: "#2a2c37", // Opened - Active
							primary50: "#2a2c37", // Opened - Focus
							neutral0: "#1d1e26", // Closed - Background
							neutral10: "#ff79c6", // Closed - Arrow
							neutral20: "#ff79c6", // Closed - Border
							neutral30: "#ff79c6", // Closed - Border Hover
							neutral40: "#ff79c6", // Closed - Arrow Hover
							neutral60: "#ff79c6", // Opened - Arrow
							neutral80: "#ff79c6", // Closed - Text
						},
					})}
				/>
			</div>
		);
	}

	renderColorPalette() {
		const { colors } = this.state;

		return (
			<div>
				<h3 id="color-palette">Color Palette</h3>
				{this.renderSelect()}
				<table className="table">
					<thead>
						<tr>
							<th>Palette</th>
							<th>{this.state.colorType.label}</th>
							<th>Color Picker</th>
						</tr>
					</thead>
					<tbody>
						{colors.map((color) => {
							return (
								<tr key={color.label}>
									<td>{color.label}</td>
									<td
										className={styles.copy}
										aria-label={this.state.tooltip}
										data-microtip-position="bottom"
										role="tooltip"
										onClick={this.copy.bind(this)}
										onMouseLeave={this.resetTooltip.bind(this)}
									>
										{color.convertedValue || color.value}
									</td>
									<td>
										<input type="color" defaultValue={color.value} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<p>
					For more details about how to apply these different colors to represent
					different code symbols, please see the{" "}
					<a href="https://spec.draculatheme.com">Dracula Specification</a>.
				</p>
			</div>
		);
	}

	async copy(e) {
		if (!navigator.clipboard) return;

		try {
			this.setState({ tooltip: "Copied!" });
			await navigator.clipboard.writeText(e.currentTarget.textContent);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	}

	resetTooltip() {
		this.setState({ tooltip: "Copy" });
	}

	render() {
		const title = "Contribute — The color palette of the Dracula theme";
		const description =
			"Check this guide to understand how to contribute to Dracula, including the most commonly asked questions and the color palette.";

		return (
			<div className="single">
				<Head>
					<meta charSet="utf-8" />
					<title>{title}</title>
					<meta content={title} property="og:title" />
					<meta content={description} name="description" />
					<meta content={description} property="og:description" />
					<meta content="Zeno Rocha" name="author" />
					<meta content="https://draculatheme.com/contribute" property="og:url" />
					<meta
						content="https://draculatheme.com/static/img/facebook.png"
						property="og:image"
					/>
				</Head>

				<div className="wrap">
					<div className="theme">
						{this.renderFaq()}
						{this.renderColorPalette()}
					</div>
				</div>

				<ProCta />
			</div>
		);
	}
}

Contribute.Layout = Theme;

export default Contribute;
