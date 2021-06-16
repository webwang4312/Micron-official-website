---
sidebar_position: 2
---




## 一、Get the height (get_height)

 Request parameter 
```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_height"
}
```


Successfully returned：  
```
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "height": "100"
  }
}  
```  
Failure return:
```
{
    "error": {
        "code": -32601,
        "message": "Method not found"
    },
    "id": "",
    "jsonrpc": "2.0"
}
```

Field description

|   Field | Type | Field description |
|:---:|:---:|:---:|  
|Request: |
|jsonrpc  |String type | 2.0 standard (the same fields will not be repeated below)|
|id       |String type | Number, what the client sends, the server replies with the same number (the same fields will not be repeated below)  |
|method       |String type| The name of the method called (the same fields are not repeated below)   |
|Response:       |  
|result       |json object|  The result information returned by the call successfully (the same fields are not repeated below)|  
|height       |String type| Block height|  
|error      | json object|  The result information returned by the call error (the same field will not be repeated below)|  
|code       |Integer| Error code (the same field will not be repeated below)|  
|message       |String type| Error description (the same fields will not be repeated below)|  

Curl example
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_height", "id": "1" }' 192.168.1.51:11190
```  

python example:

Get the height:
```
def get_height():
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_height"
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)
```

## 二、Get all transaction hashes by height (get_txids_by_height)

Request:  
```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_txids_by_height",
  "params": {
    "height": "1"
  }
}
```

Successfully returned:：   
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": [
        "772298b54a30e8b9e51b677a497369e19c3bc8ad500bf418b968638fd5d2960f",
        "6916d3a37128df383326249abfd57fec11fe693ca1b802bb0e0a9293a688c520",
        "7744719b0014bf6f733b9a0624a78273e0cf90818dd5fb02b623a0229990cebb"
    ]
}
```
Failure return: 
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  
The requested height format input error:
```
{
    "error": {
        "code": -1,
        "message": "height is invalid"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  
The requested height exceeds the height of the highest block：  
```
{
    "error": {
        "code": -4,
        "message": "height more than block top "
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

|       Field|Type |Field description|
|:---:|:---:|:---:|  
|Request: |
|params  | json object | Parameters required by the method (the same fields will not be repeated below)|
|height      |String type | Block height   |
|Response:       |  
|result       |json object|  A json array of all transaction hashes of the current block height|  

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_txids_by_height", "params": {"height": "1"} }' 192.168.1.51:11190
```

python example:

Get all transaction hashes by height  
 Interface：def get_txids_by_height()
  
```  
    height = input("please input height:")
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_txids_by_height",
        "params": {
            "height": height
        }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)
```    

## 三、Get the balance according to the address (get_balance)

 Request

```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_balance",
  "params": {
    "address": "1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES"
  }
}
```


Successfully returned:：

```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "balance": "888.666668"
    }
}
```

Failure return:

```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  

Inquiry address format input error:

```
{
    "error": {
        "code": -1,
        "message": "address is invalid "
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request: |
|address      |String type | Wallet address   |
|Response:       |  
|balance       |String type|  Wallet balance |  

Example:

```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "id": "1", "method": "get_balance", "params": { "address":"1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES" } }' 192.168.1.51:11190
```  

python example

Get the balance according to the address (get_balance)
Interface：def get_balance()
  
   ```  
    address = input("please input address:")
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_balance",
        "params": {
        "address": address
        }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)  
   ```



## 四、Get transaction details according to transaction hash (get_tx_by_txid)

Request:  
```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_tx_by_txid",
  "params": {
    "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa"
  }
}
```
Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa",
        "time": 1603854991179495,
        "type": "tx"
        "height": ""
        "vin": [
            {
                "address": "1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES",
                "output_index": 0,
                "output_value": "1000.000000",
                "prev_hash": "4df2ac157683a5553503731aa74495c556f46faf11c595b95ee5980f8b5013b0"
            }
        ],
        "vout": [
            {
                "address": "1FoQKZdUNeBXV2nTba6e354m5JrQ4rHYgA",
                "value": "10.000000"
            },
            {
                "address": "1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES",
                "value": "989.000000"
            }
        ]
    }
}
```
The transaction is not found  Return: 
```
{
    "error": {
        "code": -32000,
        "message": "not find"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  
Parameter error return：  
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  

The hash length is not equal to 64:
```
{
    "error": {
        "code": -1,
        "message": "hash is invalid"
    },
    "id": "1",
    "jsonrpc": "2.0"
}

```
Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request: |
|hash      |String type | Transaction hash   |
|Response:       |  
|hash       |String type| Transaction hash |  
|time       |Unsigned 64-bit integer|  Timestamp |  
|type       |String type| There are three types of transactions, only normal transaction types need to be processed: "tx" normal transaction; "pledge" pledge transaction; "redeem" unpledged transaction|  
|height       |String type|  The current exchange is at the block height|  
|vin       |json array|  Transaction input |  
|address       |String type|  Transaction transfer address |  
|prev_hash       |String type|  The transaction hash where utxo is located |  
|output_index       |Integer|  Index |  
|output_value       |String type|  utxo amount |  
|vout       |json array| The json object composed of the transaction transfer address and amount |  
|address       |String type|  Transaction transfer address  |  
|value       |String type|  Transaction amount |  

Actual fee calculation: output_value in vin minus all value in vout


Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "id": "1", "method": "get_tx_by_txid", "params": { "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa" } }' 192.168.1.51:11190
```

python example

Get transaction details according to transaction hash 

Interface：def get_tx_by_txid() 
   ```  
    hash = input("input you need search hash:")
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_tx_by_txid",
        "params": {
            "hash": hash
        }
    }  
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)  
   ```


 
## 五、create a transaction body (create_tx_message)

Request   
```
{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "create_tx_message",
    "params": {
        "from_addr": ["1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES"],
        "to_addr": [{"addr": "1FoQKZdUNeBXV2nTba6e354m5JrQ4rHYgA", "value": "22.222222"}],
        "fee": "0.555555"
    }
}
```

Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "tx_data": "EM2nvbfKuOwCIiIxQnVGcERtSDJiSmhxeFFveXY4Y0M4WUwzbVUyVG5VREVTMig4ZjU1M2U5ODA4MzM4MjZhMDIxYWQ5MTU4MDA5N2E5OGVkY2EzM2M3QkQKQgpAMDEwZDJmYTBkNzkwNDEzNDlmM2QwZWFmY2FjMzg5ZTQ4NTM1MzgyYzE1M2VmYzNiYWZlZjFjMTcyNjU5ZjU2YUopCI6rzAoSIjFGb1FLWmRVTmVCWFYyblRiYTZlMzU0bTVKclE0ckhZZ0FKKgjY4M+cAxIiMUJ1RnBEbUgyYkpocXhRb3l2OGNDOFlMM21VMlRuVURFU1JDeyJHYXNGZWUiOjU1NTU1NSwiTmVlZFZlcmlmeVByZUhhc2hDb3VudCI6MywiVHJhbnNhY3Rpb25UeXBlIjoidHgifQ==",
        "tx_encode_hash": "3c9a103d8542750dd048eecf2151b052ed26051f201246089bfc01e508ed7000"
    }
}  
```

create error return： 
```
{
    "error": {
        "code": -32000,
        "message": "create fail,error number:-2"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  

Parameter error return：  
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  

Input error in value format when requesting: ("value":1.2345678 or "value":"abc" etc.)

```
{
    "error": {
        "code": -32602,
        "message": "The value is wrong or More than 6 decimal places"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```


Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request: |
|from_addr |String type | Transaction hash   |
|to_addr |json array | Transaction transfer address structure   |
|addr |String type | Transaction transfer address   |
|value |String type | Transaction amount   |
|fee |String type | Transaction fuel fee  |
|Response:       |  
|tx_data |String type|  Transaction body (base64 encoding) |  
|tx_encode_hash |String type|  Transaction body hash (information to be signed) |  

Example:
  
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "id": "1", "method": "create_tx_message", "params": { "from_addr": ["1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES"], "to_addr": [{"addr": "1FoQKZdUNeBXV2nTba6e354m5JrQ4rHYgA", "value": "22.222222"}], "fee": "0.555555"} }' 192.168.1.51:11190
```

python example

Create transaction body data by calling the create_tx_message rpc interface
Interface：def create_tx_message()  
 
  ```  
      data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "create_tx_message",
        "params": {
            "from_addr": ["1FJpJQkhunjirwjKm85f1P6LcCGnF4Tfet"],
            "to_addr": [{"addr": "1McVeDa3cM6A9939wKqLmnuxp863fZXXiC", "value": "4.1"}],
            "fee": "0.1"
        }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    result = json.loads(res.text)
    tx_data = result["result"]["tx_data"]
    tx_encode_hash = result["result"]["tx_encode_hash"]   
    dict_list = {'tx_data': tx_data,
                 'tx_encode_hash': tx_encode_hash}
    return_value = json.dumps(dict_list)
    return return_value  
 ```



## 六、send transaction (send_tx)

Request  

```
{
	"jsonrpc": "2.0",
	"id": "1",
	"method": "send_tx",
	"params": {
		"tx_data": "ELvdqOvRuOwCIiIxQnVGcERtSDJiSmhxeFFveXY4Y0M4WUwzbVUyVG5VREVTMig4ZjU1M2U5ODA4MzM4MjZhMDIxYWQ5MTU4MDA5N2E5OGVkY2EzM2M3QkQKQgpAMjRkMjUxMzMxZGFkYjEyMGMyYmYxMDlhZDI2ODllOWNkMDcwYTAyZWJkZWQxNDA1ZTM5MGFlMmVhMDI0YjEzMEopCI6rzAoSIjFGb1FLWmRVTmVCWFYyblRiYTZlMzU0bTVKclE0ckhZZ0FKKgiwua+GAxIiMUJ1RnBEbUgyYkpocXhRb3l2OGNDOFlMM21VMlRuVURFU1JDeyJHYXNGZWUiOjU1NTU1NSwiTmVlZFZlcmlmeVByZUhhc2hDb3VudCI6MywiVHJhbnNhY3Rpb25UeXBlIjoidHgifQ==",
		"tx_signature": "N1ii0dikr0NJRvi7GXkjXOayD+mVcMfXF+49iOmOneYqYj2HHYzNm3Txj/otW/K7Dh3uBJ2Gb4nlTJW2AY3Dog==",
		"public_key": "ICBszM0aHCpWmDdEC3GMBL6DFN7XdWzijF33uvmWKMa1WbvWBk33+G9E4pSztJWlwDkvEt4dW4oGY8/sY2FJBtPG",
		"tx_encode_hash": "b3b8f15852efddbdfe8aa759a2f026488350b6f56a4cae7494ea3cbba0f8a5c5"
	}
}
```  


Successfully returned value:
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "tx_hash": "e241d6af1b8f8ff58508f14177005b4263d26e32a2e0d0f6b8e98d966cbaa864"
    }
}  
```

Return of signature verification failure：
```
{
    "error": {
        "code": -32000,
        "message": "create fail,error number:-8"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  

Parameter error return：  
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request: |
|tx_data |String type | Transaction body (base64 encoding), tx_data returned after the method call to create the transaction body   |
|tx_signature |String type | The signature information obtained by signing the transaction hash (tx_encode_hash), call the dynamic library   |
|public_key |String type | Public key (base64 encoding)   |
|tx_encode_hash |String type | Transaction body hash (information to be signed), tx_encode_hash returned after the creation of the transaction body method call  |
|fee |String type | Transaction fuel fee   |
|Response:       |  
|tx_hash |String type|  Transaction hash (complete transaction information can be queried through this hash) |  

The value of tx_signature needs to be signed by calling the GenSign_() method in the static library in the document

example
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "id": "1", "method": "send_tx", "params": { "tx_data":"ELvdqOvRuOwCIiIxQnVGcERtSDJiSmhxeFFveXY4Y0M4WUwzbVUyVG5VREVTMig4ZjU1M2U5ODA4MzM4MjZhMDIxYWQ5MTU4MDA5N2E5OGVkY2EzM2M3QkQKQgpAMjRkMjUxMzMxZGFkYjEyMGMyYmYxMDlhZDI2ODllOWNkMDcwYTAyZWJkZWQxNDA1ZTM5MGFlMmVhMDI0YjEzMEopCI6rzAoSIjFGb1FLWmRVTmVCWFYyblRiYTZlMzU0bTVKclE0ckhZZ0FKKgiwua+GAxIiMUJ1RnBEbUgyYkpocXhRb3l2OGNDOFlMM21VMlRuVURFU1JDeyJHYXNGZWUiOjU1NTU1NSwiTmVlZFZlcmlmeVByZUhhc2hDb3VudCI6MywiVHJhbnNhY3Rpb25UeXBlIjoidHgifQ==", "tx_signature": "N1ii0dikr0NJRvi7GXkjXOayD+mVcMfXF+49iOmOneYqYj2HHYzNm3Txj/otW/K7Dh3uBJ2Gb4nlTJW2AY3Dog==", "public_key": "ICBszM0aHCpWmDdEC3GMBL6DFN7XdWzijF33uvmWKMa1WbvWBk33+G9E4pSztJWlwDkvEt4dW4oGY8/sY2FJBtPG", "tx_encode_hash": "b3b8f15852efddbdfe8aa759a2f026488350b6f56a4cae7494ea3cbba0f8a5c5"} }' 192.168.1.51:11190
```

python example

 Call the send_tx rpc interface to send the transaction
  @param tx_data Create transaction body (create_tx_message) returned tx_data
  @param tx_signature Generate the message information returned by the signature information (generate_sign)
  @param public_key Generate wallet address, public key and public_key returned by private key (generate_wallet)
  @param tx_encode_hash Create transaction body (create_tx_message) returned tx_encode_hash
     
 Interface： def send_tx(tx_data, tx_signature, public_key, tx_encode_hash)
 ```   
 from ctypes import cdll
  
  cur = cdll.LoadLibrary('./jcAPI.so')
  tx_signature = cur.GenSign(pri_key,tx_encode_hash,tx_encode_hash.length)
   data = {
	    "jsonrpc": "2.0",
	    "id": "1",
	    "method": "send_tx",
	    "params": {
		    "tx_data": tx_data,
		    "tx_signature": tx_signature,
		    "public_key": public_key,
		    "tx_encode_hash": tx_encode_hash
	    }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
     result = json.loads(res.text)  
 ```
   


## 七、Get the average transaction fuel fee at the height of the last 100 blocks (get_avg_fee)

Description:
The fee is set independently by the miner. If the fee value set when sending a transaction is lower than the fee value set by most miners, the transaction may be unsuccessful. Therefore, you can set it by referring to the average fee value of the latest 100 blocks to ensure the transaction can be successful.

Request

```
{
	"jsonrpc": "2.0",
	"id": "1",
	"method": "get_avg_fee"
}
```


Successfully returned:：
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "avg_fee": "0.112074"
    }
}  
```  

Failure return: 
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|
|Response:       |  
|avg_fee |String type|  The average of the fee of the last 100 height blocks, if the height is less than 100, it is the average of all blocks |  

Example
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_avg_fee", "id": "1" }' 192.168.1.51:11190
```

python example

Get the average transaction fuel fee of the last 100 blocks
```   
def get_avg_fee():
    data = {
        "jsonrpc": "2.0",
	    "id": "1",
	    "method": "get_avg_fee"
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)
```



## 八、Generate wallet address, public key and private key (generate_wallet)

Request

``` 
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "generate_wallet"
}
```

Successfully returned:：
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "address": "1BGmh7NgY7spKRBHJkwQTZosaHGiXfynvj",
        "private_key": "xAEF+gTQZ6PmtH3hlmygJpAVxBpKHBa3Zw8iMxRjlbQ=",
        "public_key": "ICD6bienPIel1KE4WmGlQ6bC6M+HiPTw3+et036AUaTVtLr1iV1DMFFx2O9VYi/MUXOZyKK87s/GjPE+eN9A+wEl"
    }
}
```
Failure return: 
 
 ```
 {
    "error": {
        "code": -32601,
        "message": "Method not found"
    },
    "id": "",
    "jsonrpc": "2.0"
 }
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Response:       |  
|address |String type| Wallet address |  
|private_key |String type| base64 encoded private key |  
|public_key |String type| Base64 encoded public key |  

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "generate_wallet", "id": "1" }' 192.168.1.51:11190
```

python example:  
Generate wallet address and corresponding public and private keys by calling the generate_wallet rpc interface 
``` 
def generate_wallet():  
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "generate_wallet"
    }  
    headers = {
        "Content-Type": "application/json"
    }  
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    result = json.loads(res.text)
    address = result["result"]["address"]
    private_key = result["result"]["private_key"]
    public_key = result["result"]["public_key"]
    dict_list = {'address': address,
                 'private_key': private_key, 'public_key': public_key}
    return_value = json.dumps(dict_list)
    return return_value
```



## 九、Generate signature information (generate_sign)

Request

``` 
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "generate_sign",
  	"params": {
		"data": "b3b8f15852efddbdfe8aa759a2f026488350b6f56a4cae7494ea3cbba0f8a5c5",
		"private_key": "xAEF+gTQZ6PmtH3hlmygJpAVxBpKHBa3Zw8iMxRjlbQ="
	}
}
```
Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "message": "Ggy2ouJDIZw9/ShvZUwXyVgsAXSFLsxvRCh42elAf+Klit6DJH/jUY6Z3Km/W7VhPKinrsHcaEcwYqIUIwopWQ=="
    }
}  
```  

Failure return: 
  
 ```
 {
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
  }
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|data |String type| To be signed, return tx_encode_hash after the create_tx_message method is called |  
|private_key |String type| base64 encoded private key  |  
|Response：     |  
|message |String type| Signed information after base64 encoding |  

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "generate_sign", "id": "1", "params": { "data": "b3b8f15852efddbdfe8aa759a2f026488350b6f56a4cae7494ea3cbba0f8a5c5", "private_key": "xAEF+gTQZ6PmtH3hlmygJpAVxBpKHBa3Zw8iMxRjlbQ=" } }' 192.168.1.51:11190
```

python example

 Call the generate_sign rpc interface to sign
 @param tx_encode_hash Create transaction body (create_tx_message) returned tx_encode_hash
  @param private_key Generate wallet address, public key and private_key returned by private key (generate_wallet)

```  
def generate_sign(tx_encode_hash, private_key):
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "generate_sign",
  	    "params": {
		    "data": tx_encode_hash,
		    "private_key": private_key
	    }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    result = json.loads(res.text)
    //The message returned after getting the signature*
    message = result["result"]["message"]
    //Package message into json format
    dict_list = {"message": message}
    return_value = json.dumps(dict_list)
    return return_value
```



## 十、Query pending transactions (get_pending_transaction)

Request

``` 
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_pending_transaction",
  	"params": {
		"address": "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
	}
}
```


Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "total": 1,
        "transaction": [
            {
                "amount": "501",
				"broadstamp": 1620378873518030,
                "from": [
                    "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
                ],
                "gap": "0.050000",
                "hash": "4303e57195616797f77d7db888ef15d677740d8f10a9a8e29370d35c3cc853fb",
                "timestamp": 1620378873279899,
                "to": [
                    "1HjrxHbBuuyNQDwKMh4JtqfuGiDCLodEwC"
                ],
                "toAmount": [
                    "501.000000"
                ],
                "vin": [
                    "7d9a0cb698db789b5f294343209b94ca69119f02593cb5607069623810f6ed69",
                    "92c45d62b86d37c04f5f873eedfdcb1719eeca9a43e16b206e98101d20baeb0c",
                    "d2c9da85e7b67188c507f40a95cba88c491afca56b863cce6af512638c7b1b1c"
                ]
            }
        ]
    }
}
```
Request address format input error：  
```
{
    "error": {
        "code": -1,
        "message": "address is invalid"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|address |String type | Transaction initiator address |  
|Response：     |  
|total | Numerical type | The number of pending transactions |  
|transaction | Array type | Transaction content, including transaction hash, initiator, receiver, amount, timestamp |  

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_pending_transaction", "id": "1", "params": { "address": "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"} }' 192.168.1.51:11190
```

python example

Query pending transactions
Interface：def get_pending_transaction()  
```
    address = input("input address:")
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_pending_transaction",
  	    "params": {
		    "address": address
	    }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print(res.text)
```



## 十一、Query failed transactions (get_failure_transaction)

Request

``` 
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_failure_transaction",
  	"params": {
		"address": "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
	}
}
```


Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "total": 1,
        "transaction": [
            {
                "amount": "500",
                "from": [
                    "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
                ],
                "gap": "0.050000",
                "hash": "13f9730d0ce5fe401352f42fdce3677e324d15518857c02e0aafc6b5456a7676",
                "timestamp": 1609313648455902,
                "to": [
                    "1HjrxHbBuuyNQDwKMh4JtqfuGiDCLodEwC"
                ],
                "toAmount": [
                    "500.000000"
                ],
                "vin": [
                    "b8930d79b8ecbdd2141d3b4fa85fa7dc0e4c6b3c3e30a379d573aacd34299b18",
                    "c99ac37f9a9c591e51ea31551455f3662eac4e54a1c27923a81e7966c0eadbfa",
                    "08cb13dea1510860de5549a71c8142e16af6698b9b0d9bea3a813789727d084f"
                ]
            }
        ]
    }
}
```
Failure return:

Inquiry address format input error: 
```
{
    "error": {
        "code": -1,
        "message": "address isinvalid"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|address |String type| Transaction initiator address |  
|Response：     |  
|total | Numerical type | The number of pending transactions |  
|transaction | Array type | Transaction content, including transaction hash, initiator, receiver, amount, timestamp|  

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_failure_transaction", "id": "1", "params": { "address": "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"} }' 192.168.1.51:11190
```

python example

Query failed transactions
```
def get_failure_transaction():
    address = input("请输入要查询的地址:")
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_failure_transaction",
  	    "params": {
		    "address": address
	    }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    result = json.loads(res.text)
```



## 十二、Get the block information list (get_block_info_list)

Request

``` 
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_block_info_list",
  	"params": {
		"index": "15",
        "count": "3",
        "type": "0"
	}
}
```


Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "height": [
            [
                {
                    "block_hash": "b4f74ea3a735a0e6de5c4041bbecfc1b6e2a30156ad41ade7e98c9992e3141ec",
                    "block_height": 15,
                    "block_time": 1611132153984580,
                    "tx": {
                        "amount": "3099.000000",
                        "from": [
                            "1vkS46QffeM4sDMBBjuJBiVkMQKY7Z8Tu"
                        ],
                        "hash": "b9b417999b0e4d165d822e9fa9c8fdc553fdd9d6affb054d0a258f6d3db352ee",
                        "to": [
                            "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
                        ]
                    }
                }
            ],
            [
                {
                    "block_hash": "9870c60872e171b747f35e2f4e876e0792833cb8a258151e38aa1c7f72a52734",
                    "block_height": 14,
                    "block_time": 1611131849651811,
                    "tx": {
                        "amount": "3983.000000",
                        "from": [
                            "1vkS46QffeM4sDMBBjuJBiVkMQKY7Z8Tu"
                        ],
                        "hash": "98a483aa1c0b77fed0b69c36888fe6e953fe96d5432a17704e76e4f5a5bc2d64",
                        "to": [
                            "1TT8sdzyPhqSmSx7Wdmn1ECeEHZKosh6v"
                        ]
                    }
                }
            ],
            [
                {
                    "block_hash": "e79fb3d28be54e12a7e5ae9c21d91cefc6ba0d8f25681717d07348b569083f3f",
                    "block_height": 13,
                    "block_time": 1611050624949290,
                    "tx": {
                        "amount": "2349.000000",
                        "from": [
                            "1vkS46QffeM4sDMBBjuJBiVkMQKY7Z8Tu"
                        ],
                        "hash": "bfe2bf795003c2960d09ad03b1d9dd5bc2109c3eba3fe790fd2001f43ce1fc8b",
                        "to": [
                            "1MpeeKXwH1ArnMJ85D161yfH1us471J86X"
                        ]
                    }
                }
            ]
        ]
    }
}  
```  
Failure return:
The index format entered by the requester is incorrect:  
```
{
    "error": {
        "code": -32602,
        "message": "index Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  
The count format entered by the requester is wrong:
```
{
    "error": {
        "code": -32602,
        "message": "count Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```

The count entered by the requester cannot be 0: 
```
{
    "error": {
        "code": -1,
        "message": "count is not equal zero！"
    },
    "id": "1",
    "jsonrpc": "2.0"
}  
```  
The type format entered by the requester is wrong:  
```
 {
    "error": {
        "code": -32602,
        "message": "type Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
 }
```

Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|index |Numerical type| The highest starting index address of the block. You can specify 0 to read from the current highest block | 
|count |Numerical type|  The number of blocks to be read, listed from high to low | 
|type |Numerical type|  The default is 0, and will be used for future expansion |  
|Response：     |  
|height | Array type | Block data for each level |  
|block_hash |String type| Block hash |  
|block_height |Numerical type| The height of the block |  
|block_time |Numerical type| Block time |  
|amount |String type| Transaction amount |  
|from | Array type | Transaction amount |  
|hash |String type| Transaction hash |  
|to | Array type | Transaction receiver |  

Example:

```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "get_block_info_list", "id": "1", "params": { "index": "15", "count": "3", "type":"0" } }' 192.168.1.51:11190
```

python example

Get the block information list 
Interface：def get_block_info_list()  
```
    data = {
        "jsonrpc": "2.0",
        "id": "1",
        "method": "get_block_info_list",
  	    "params": {
		    "index": "15",
            "count": "3",
            "type": "0"
	    }
    }
    headers = {
        "Content-Type": "application/json"
    }
    res = requests.post(
        url=domain,
        data=json.dumps(data),
        headers=headers)
    print("get_block_info_list res.text:", res.text)
    result = json.loads(res.text)
```

## 十三、Confirm whether the transaction is successful (confirm_transaction)
Request：

```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "confirm_transaction",
  	"params": {
		"tx_hash": "d7ef410796ffa9ef60982c3470f5d816c28a4ea2d3c5299228ef2f5997bf8221"
	}
}
```

Successfully returned:：

```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "nodeid": [
            "d0b206ec2cee4c04b614d7dc4f9b83584269acd8",
            "c0f710f6b70588bd92983bf50ac710d94f913141",
            "8e41e25eb4ee88a52c34f159d33ada701ce68469",
            "5addc8e04079cc00c49754833b81f67b9458cff5",
            "797a07e6ff413bb35c75243efa087fdc714e0a7d",
            "bc37516cdea7acf3938049219698b9d7db493eba",
            "003f2d85999a6ad668e66dc7cf1ec20dfc1aa9c0"
        ],
        "success": 1,
        "total": 7
    }
}
```

Failure return:

```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "nodeid": null,
        "success": 0,
        "total": 0
    }
}
```

The format of the tx_hash parameter is incorrect:

```
{
    "error": {
        "code": -32700,
        "message": "Parse error"
    },
    "id": "",
    "jsonrpc": "2.0"
}
```


Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|tx_hash |String type| The transaction hash of this transaction | 
|Response：     |  
|nodeid |Array type | The transaction hash of this transaction   |  
|total |Numerical type | The number of returns after the successful transaction node is confirmed |  
|success |Boolean type | Success or failure |  

Example

```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "method": "confirm_transaction", "id": "1", "params": { "tx_hash": "d7ef410796ffa9ef60982c3470f5d816c28a4ea2d3c5299228ef2f5997bf8221"} }' 192.168.1.51:11190
```
## 十四、Get transaction details based on transaction hash and node ID (get_tx_by_txid_and_nodeid)
Request:  
```
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "get_tx_by_txid",
  "params": {
    "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa",
	"nodeid":"d0b206ec2cee4c04b614d7dc4f9b83584269acd8"
  }
}
```
Successfully returned:：  
```
{
    "id": "1",
    "jsonrpc": "2.0",
    "result": {
        "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa",
        "time": 1603854991179495,
        "type": "tx"
        "height": ""
        "vin": [
            {
                "address": "1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES",
                "output_index": 0,
                "output_value": "1000.000000",
                "prev_hash": "4df2ac157683a5553503731aa74495c556f46faf11c595b95ee5980f8b5013b0"
            }
        ],
        "vout": [
            {
                "address": "1FoQKZdUNeBXV2nTba6e354m5JrQ4rHYgA",
                "value": "10.000000"
            },
            {
                "address": "1BuFpDmH2bJhqxQoyv8cC8YL3mU2TnUDES",
                "value": "989.000000"
            }
        ]
    }
}
```
The transaction is not found. Return:
```
{
    "error": {
        "code": -32000,
        "message": "not find"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  
Parameter error return：  
```
{
    "error": {
        "code": -32602,
        "message": "Invalid params"
    },
    "id": "1",
    "jsonrpc": "2.0"
}
```  

The hash length is not equal to 64:
```
{
    "error": {
        "code": -1,
        "message": "hash is invalid"
    },
    "id": "1",
    "jsonrpc": "2.0"
}

```
Field description

| Field|Type |Field description|
|:---:|:---:|:---:|  
|Request：     |  
|hash |String type| Transaction hash | 
|Response：     |  
|hash |String type| Transaction hash |  
|time | Unsigned 64-bit integer | Timestamp |  
|type |String type| There are three types of transactions, only normal transaction types need to be processed: "tx" normal transaction; "pledge" pledge transaction; "redeem" unpledged transaction |
|height |String type| The current exchange is at the block height |  
|vin |json array| Transaction input |  
|address |String type| Transaction transfer address |  
|prev_hash |String type| The transaction hash where utxo is located |  
|output_index |Integer| Index |  
|output_value |String type| utxo amount |  
|vout |json array| The json object composed of the transaction transfer address and amount |  
|address |String type| Transaction transfer address |  
|value |String type| Transaction amount |  

Actual fee calculation: output_value in vin minus all value in vout

Example:
```
curl -i -X POST -H "Content-Type: application/json; indent=4" -d '{"jsonrpc": "2.0", "id": "1", "method": "get_tx_by_txid_and_nodeid", "params": { "hash": "3bb0c305a59c45a35eb48fef3ac5a9f42104a083288b867572fa07b9a7961baa","nodeid":"d0b206ec2cee4c04b614d7dc4f9b83584269acd8" } }' 192.168.1.51:11190
```