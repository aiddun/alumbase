import React from "react";

function makerandom(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789😃🧘🏻‍♂️🌍🍞,🚗,📞🎉♥️";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function genClassTag(): string {
  return (
    makerandom(Math.random() * 40) + " hidden " + makerandom(Math.random() * 40)
  );
}

function genClassTag2(): string {
  return (
    makerandom(Math.random() * 40) +
    " whitespace-pre-wrap " +
    makerandom(Math.random() * 40)
  );
}

function genClassTag3(): string {
  return (
    makerandom(Math.random() * 40) +
    " whitespace-pre-wrap " +
    makerandom(Math.random() * 40)
  );
}

function genUnique(used: {}): string {
  let out;
  while ((out = makerandom(10)) in used);
  return out;
}

const Obfuscate = ({ text }: { text: string }) => {
  const keyCache = {};
  return (
    <>
      {text.split("").flatMap((char) => (
        <>
          <span key={genUnique(keyCache)} className={genClassTag2()}>{char}</span>

          {/* Add garbage */}
          {/* TODO: Better than hidden */}
          {Math.random() > 0.3 && (
            <span key={genUnique(keyCache)} className={genClassTag()} id={genClassTag3()}>
              {makerandom(Math.random() * 5)}
            </span>
          )}
          {Math.random() > 0.3 && (
            <span key={genUnique(keyCache)} className={genClassTag()} id={genClassTag3()}>
              {makerandom(Math.random() * 1)}
            </span>
          )}
          {Math.random() > 0.3 && (
            <span key={genUnique(keyCache)} className={genClassTag()} id={genClassTag3()}>
              {makerandom(Math.random() * 10)}
            </span>
          )}
        </>
      ))}
    </>
  );
};

export default Obfuscate;
