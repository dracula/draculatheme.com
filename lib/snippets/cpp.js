const cpp = `#include <string>
#include <vector>

typedef std::vector<std::string> weaknesses_list;

/*
 * Once upon a time...
 */
class Vampire {
 private:
  std::string _location;
  int _birth_date;
  int _death_date;
  weaknesses_list *_weaknesses;

 public:
  Vampire(std::string location, int birth_date, int death_date,
          weaknesses_list *weaknesses)
      : _location(location),
        _birth_date(birth_date),
        _death_date(death_date),
        _weaknesses(weaknesses) {}

  int age() { return this->calc_age(); }

 private:
  int calc_age() { return this->_death_date - this->_birth_date; }
};

/* ...there was a guy named Vlad */
int main() {
  std::string location = "Transylvania", weakness_sunlight = "Sunlight",
              weakness_garlic = "Garlic";
  int birth_date = 1428, death_date = 1476;
  weaknesses_list *weaknesses = new weaknesses_list();
  weaknesses->push_back(weakness_sunlight);
  weaknesses->push_back(weakness_garlic);

  Vampire *dracula = new Vampire(location, birth_date, death_date, weaknesses);

  return 0;
}`

export default cpp;