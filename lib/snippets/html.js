const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dracula</title>
</head>
<body>
  <!--
    Once upon a time...
  -->

  <h1>Vampires</h1>

  <form>
    <label for="location">Location</label>
    <input type="text" name="location" value="Transylvania">

    <label for="birthDate">Birth Date:</label>
    <input type="number" name="birthDate" value="1428">

    <label for="deathDate">Death Date:</label>
    <input type="number" name="deathDate" value="1476">

    <label for="weaknesses">Weaknesses:</label>
    <input type="checkbox" name="weaknesses" value="Sunlight" checked>
    <input type="checkbox" name="weaknesses" value="Garlic" checked>

    <button type="submit">Submit</button>
  </form>

  <script>
    // ...there was a guy named Vlad
    const form = document.querySelector('form');
    form.addEventListener('submit', calcAge);

    function calcAge(e) {
      e.preventDefault();

      const { birthDate, deathDate } = e.target;
      const age = deathDate.value - birthDate.value;
      console.log(age);
    }
  </script>
</body>
</html>`;

export default html;
