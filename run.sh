# activate virtualen

# check if virtualenv exists
pyEnvDir=./env

if [ -d "$pyEnvDir" ]; then
    echo "$pyEnvDir exists."
else
	echo "$pyEnvDir does not exist."
	python3 -m venv env
	pip install -r ./flask_backend/requirements.txt
fi


# check if node modules exists
nodeDir=./todo_app_frontend/node_modules

if [ -d "$nodeDir" ]; then
    echo "$nodeDir exists."
else
	echo "$nodeDir does not exist."
	npm i --prefix todo_app_frontend
fi

source ./env/bin/activate

trap "kill 0" EXIT

python3 ./flask_backend/app.py & npm run start --prefix todo_app_frontend

wait
