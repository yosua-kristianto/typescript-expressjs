import fs from "fs";

export class Log {

 /**
  * getTimeStamp
  *  A function to get current timestamp, 
  *  and convert it into readable string.
  * 
  * @return string
  */
  private static getTimeStamp = (): string => new Date().toISOString();

  private static getDate(): string {
    const dateObj: any = new Date();
    const date = (dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate());
    const month = (dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1);

    return `$${dateObj.getFullYear()}-${month}-${date}`;
  }

  /**
   * writeLog
   *  A function to write log message to file.
   *  
   * @return void
   */
  private static writeLog(str: string): void {
    
    const currentFileName: string = `./logs/${Log.getDate()}.log`;
    const logFormat: string = `${str}\n`;

    fs.appendFile(currentFileName, logFormat, (appendError: any) => {
      if(appendError) {

        Log.e("LOG", "Something error when append", appendError);

        fs.writeFile(currentFileName, logFormat, (writeError: any) => {
          Log.e("LOG", "Something error when write", writeError);
        });
      }
    });


  }

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

    Log.writeLog(generatedLog);
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

     Log.writeLog(generatedLog);
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

    Log.writeLog(generatedLog);
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

    Log.writeLog(generatedLog);
  }
}
