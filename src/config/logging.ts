/**
 * logging.ts
 * This file contains logging system
 */

class Log {
 
 /**
  * getTimeStamp
  *  A function to get current timestamp, 
  *  and convert it into readable string.
  * 
  * @return string
  */
  static getTimeStamp = (): string => new Date().toISOString();

  /**
   * i
   *   A function that print logs on the console as 
   *   an informative message.
   */
  static i(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${Log.getTimeStamp()}] [INFO] [${namespace}] ${message}`;

    if(object) {
  
      console.log(generatedLog, object);
  
    }else{
      
      console.log(generatedLog);
  
    }
  }

  /**
   * d
   *   A function that print logs on the console as 
   *   an debug message.
   */
  static d(namespace: string, message: string, object?: any): void {
     let generatedLog = `[${Log.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`;  

     if(object) {
   
       console.info(generatedLog, object);
   
     }else{
       
       console.info(generatedLog);
   
     }
   }

  /**
   * e
   *   A function that print logs on the console as 
   *   an error message.
   */
   static e(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${Log.getTimeStamp()}] [ERROR] [${namespace}] ${message}`;  
    
    if(object) {
  
      console.error(generatedLog, object);
  
    }else{
      
      console.error(generatedLog);
  
    }
  }

  /**
   * w
   *   A function that print logs on the console as 
   *   an warning message.
   */
   static w(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${Log.getTimeStamp()}] [WARNING] [${namespace}] ${message}`;  
    
    if(object) {
  
      console.warn(generatedLog, object);
  
    }else{
      
      console.warn(generatedLog);
  
    }
  }
}

export default {
  Log
};