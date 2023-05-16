export default function handle(req, res) {
    const method = req.method;
    if(method === 'POST') {
        const {name} = req.body;
        console.log('name', name);
    }
}