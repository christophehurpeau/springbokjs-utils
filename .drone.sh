# Go to project > Repository and set the branch filter
# Then click on "View Key" and paste it on github

sudo apt-get install jscoverage
npm install -g karma-cli
npm install

echo "\n> Ensure that the code is warning free"
node_modules/.bin/gulp lint || exit 1

echo "\n> Run tests"
npm test || exit 1

#echo "\n> Run browser tests"
#sudo start xvfb
#karma start --single-run --browsers=Firefox,Chrome,PhantomJS || exit 1

#echo "\n> Run build"
#node_modules/.bin/gulp build || exit 1

echo "\n> Generate docs"
node_modules/.bin/gulp docs || exit 1

echo "\n> Copy docs up to github gh-pages branch"
mv docs docs-tmp
git checkout -f gh-pages
rm -Rf docs
mv docs-tmp docs
date > date.txt
git add docs
git commit -m"auto commit from drone.io"
git remote set-url origin git@github.com:christophehurpeau/springbokjs-utils.git
git push origin gh-pages

