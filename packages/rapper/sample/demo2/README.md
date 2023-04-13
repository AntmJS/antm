# v0.0.3

> # --- 他来了

````ts
 function createFetch<REQ extends Record<string, unknown>, RES extends {data: any}> (url: string, method: string) {
      return  <T extends boolean = false>(
        data: REQ,
        options?: {
          proxy?: T
          pageError?: boolean
        }
      ): Promise<T extends true ? RES['data'] : RES> => {
        return instance(
          {
            url,
            method,
            data,
          },
          options
        )
      }
    }
    ```




````
