FROM node:12.16.1

WORKDIR /Dock

COPY package*.json ./

#Copy src code
COPY . .


#WORKDIR /Dock
#expose ports that our app uses
EXPOSE 3000
EXPOSE 3001

CMD ["yarn", "setup"]
CMD ["yarn", "start-dev"]