# To Do List API

RESTful API for to do list applications built with Node.js, Express and MongoDB

## Installation

To begin with, clone the repository and install the dependencies with the following commands:

```bash
git clone https://github.com/RicardoDalcin/to-do-list-api.git
cd to-do-list-api
npm install
```

Next, make sure to remove the .example extension from the files inside src/config, and edit them to match your information (there's no need to create a database, since MongoDB takes care of it)

## Usage

Just run the following command inside the folder and you'll be good to go:

```node
npm run dev
```

If you'll be using this API along with the React Native app, you can use Ngrok to make HTTP requests:

```node
npm install -g ngrok
ngrok http 3001
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
