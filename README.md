# Trinity

Welcome to the Trinity Project! This project uses ManimGL 1.6.8 to create mathematical animations of the model of real numbers using 3 constants (0,1,infinity).

## Dependencies

- Python (version 3.6 or higher)
- ManimGL (version 1.6.8)

## Installation

First, clone this repository to your local machine:

```bash
git clone https://github.com/holymathradio/trinity.git
cd trinity
```
It's a good practice to use a virtual environment to manage your dependencies. You can create one using venv:

```bash
python3 -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
```
Install manimgl:
```bash
pip install manimgl==1.6.1
pip install setuptools
```

## Run a ManimGL script

Run desired files with manim option (read, skip, write to file)
```bash
manimgl 1-genesis.py Genesis
manimgl 2-nicenecreed.py Nicene -n 100 // skips to 100th steps
manimgl 3-trinity.py Trinity -w // write the file
```

## Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## License
This project falls under the MIT License.
