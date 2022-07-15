/* Callback Template

  All function in here are used as callback template.
  So you may not make any anonymous function within the asynchronous tests.

*/

export function handleTestResult(e: any): any {

  if(e instanceof Error){
    console.log(`Test Unsuccesful due to ${e.message}`)
  }else {
    console.log(`Test runned Succesfully`);
  }

  return e;
}