export default async (req, res) => {
  try {
    const pppReq = await fetch('https://ppp.dracula.workers.dev');
    const { country, discount } = await pppReq.json();

    if (!country || !discount) {
    	throw 'Some internal error happened while processing the worker'
    	return;
    }

    res.status(200).json({ country, discount });
  }
  catch(error) {
    res.status(500).json({ error });
  }
};