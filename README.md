
www.d-ctrl.github.io

## Build Setup 
```
# Install node, but first install nvm (node version manager) with 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash

# clone the repo
git clone git@github.com:d-ctrl/website.git
cd website

# install dependencies
npm install

# switch branch (for Crusty)
git checkout OP_CC
git pull

# serve with hot reload at localhost:8080
npm run dev
```


Vue Webpack Guide : [guide](http://vuejs-templates.github.io/webpack/)
Docs for Loader : [docs](http://vuejs.github.io/vue-loader).
