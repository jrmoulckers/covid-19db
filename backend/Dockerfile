FROM python:3

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install libboost-all-dev libgmp-dev vim nodejs

RUN pip install --upgrade pip
RUN pip --version

WORKDIR /app/build

COPY requirements.txt ./

RUN pip install -r requirements.txt

RUN npm i newman

EXPOSE 5000