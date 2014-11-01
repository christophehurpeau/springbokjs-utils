# Go to project > Repository and set the branch filter
# Then click on "View Key" and paste it on github

npm install -g karma-cli
npm install -g codeclimate-test-reporter
npm install
npm install mocha-lcov-reporter

echo "\n> Ensure that the code is warning free"
node_modules/.bin/gulp lint || exit 1

echo "\n> Build"
node_modules/.bin/gulp build-all || exit 1

echo "\n> Run tests for node"
node_modules/.bin/mocha --harmony --recursive -u tdd tests/lib/ || exit 1

# echo "\n> Prepare tests for browsers"
# node_modules/.bin/gulp springbokjs-shim || exit 1

# echo "\n> Run browser tests"
# sudo start xvfb
# karma start karma.conf.js --single-run --browsers=Firefox,Chrome,PhantomJS || exit 1

echo "\n> Generate docs (api and coverage)"
node_modules/.bin/gulp docs || exit 1

echo "\n> Generate coverage for codeclimate"
cd lib-cov
TEST_COV=1 ../node_modules/.bin/mocha --harmony --recursive -u tdd --reporter mocha-lcov-reporter ../tests/lib | CODECLIMATE_REPO_TOKEN=fe4e2435180db1b19a800baaba8bd263f85bb65375c4f600e36e62dbc97c9c88 codeclimate
cd ..

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

