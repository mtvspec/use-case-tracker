function f(args, cb) {
  console.log(args);
  if (!args) return cb({err: 'args required'}, null);
  if (args) return cb(null, {success: 'ok'});
}

function f1() {

}

class c1 {

}

console.log(f(0.1, function (err, done) {
  if (err) return err;
  if (done) return done;
}));

/**
 * falsy values:
 * false
 * 0
 * 0.0 => 0
 * ''
 * NaN
 * undefined
 * null
 *
 * trufy values:
 * true
 * 1
 * 0.1
 * empty object {}
 * empty array []
 * function
 * number
 * string
 * class
 */
