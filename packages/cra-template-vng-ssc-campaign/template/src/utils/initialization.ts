function showInformation() {
  console.log(
    '%cZalo%cPay',
    'font-size:50px; font-weight:bold; color:#4194E0; padding: 5px',
    `font-size:50px; font-weight:bold; background-color:#5EBD41; 
    color:#fff; border-radius: 5px; padding: 5px`
  );
  const { REACT_APP_PROJECT_NAME: name, REACT_APP_PROJECT_VERSION: version } = process.env;
  console.log(`${name}:${version}`);
}

async function asyncInitialization() {
  showInformation();
}

export default asyncInitialization;
