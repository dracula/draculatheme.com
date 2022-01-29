const rust = `// Once upon a time...

#[derive(Debug)]
pub struct Vampire {
	location: String,
	birth_date: u16,
	death_date: u16,
	weaknesses: Vec<String>,
}

impl Vampire {
	pub fn new(
		location: String,
		birth_date: u16,
		death_date: u16,
		weaknesses: Vec<String>,
	) -> Self {
		Vampire {
			location,
			birth_date,
			death_date,
			weaknesses,
		}
	}

	pub fn age(&self) -> u16 {
		self.calc_age()
	}

	fn calc_age(&self) -> u16 {
		self.death_date - self.birth_date
	}
}

// ...there was a guy named Vlad

fn main() {
	let dracula = Vampire::new(
		"Transylvania".to_string(),
		1428,
		1476,
		vec!["Sunlight".to_string(), "Garlic".to_string()],
	);

	println!("{:?}", dracula);
}`;

export default rust;
