---
sidebar_position: 1
---
#### Request data specification

1. All network requests must be organized according to the protocol specification (data format), and then sent to the mainnet node (port 11187) using a socket connection. When the main network node receives the request, it will return it to the requesting party in accordance with the same protocol specification (data format). The requesting party needs to parse the relevant data by itself to obtain the interface return information.

2. Part of the information in the request protocol is encapsulated in protobuf. After encapsulation, it is serialized and then filled in the request protocol for sending. Generally, the name of the request protocol ends with Req. After sending to the mainnet, the mainnet will return the protobuf data body ending with Ack for response. For example, the sub-protocol interface for requesting the balance is GetAmountReq, and the response data body of the mainnet server after receiving the request is GetAmountAck.

3. The data format of the request protocol is as follows:


    | Total length of agreement |     General agreement    | Checksum | Flag bit | End sign |
    | :--------: | :--------------: | :----: | :----: | :------: |
    |   4bytes   | Serialization string | 4bytes | 4bytes | 4bytes   |

   - Total length of the agreement
- This field is 4 bytes and records the total length of the following **General Protocol** + **Checksum** + **Mark Bit** + **End Mark**. Assuming that the general protocol is 100 bytes, the checksum is 4 bytes, the flag bit is 4 bytes, and the end tag is 4 bytes, the total length is 100 + 4 + 4 + 4 = 112 bytes.

  - General Agreement

       - The general protocol is profobuf format, and the prototype is as follows.

          ```dict
          message CommonMsg
          {
              string version = 1;
              string type = 2;
              int32 encrypt = 3;
              int32 compress = 4;
              bytes data = 5;
          }
          ```

          |   Field  |                             Description                           |
          | :------: | :----------------------------------------------------------: |
          | version  |                    Version number.                                    |
          |   type   | Sub-protocol type name. Fill in the interface name according to actual business needs, such as "GetAmountReq". |
          | encrypt  |            Whether to encrypt. 1 means encryption, 0 means no encryption, the default is 0.         |
          | compress |            Whether to compress. 1 means compression, 0 means no compression, the default is 0.        |
          |   data   | The serialized data of the protobuf data body of the sub-protocol interface needs to be serialized after the protobuf type data of the sub-protocol interface is serialized, and then sent after being filled into the data.。 |


   - Flag bit
        
        - The length of the flag bit is 4 bytes, and the structure is as follows:

        |    3     |     2    |    1     |    0     |
        | :------: | :------: | :------: | :------: |
        |   Keep   |   Keep   |   Keep   |  Priority  |

        
        Priority: The default is 0.
          
   - Checksum

        - The checksum length is 4 bytes, which is the checksum information calculated by the Adler32 algorithm after the general protocol is serialized.
   - End sign

        - The end tag is 4 bytes long and its content is 7777777.

4. After sending the request protocol to the mainnet, the mainnet also encapsulates the return information according to the request protocol format and sends it to the requester. After the requester receives the information:

    1. Obtain complete return information based on the total length of the agreement.
    2. Obtain the general protocol, checksum, flag bit, and end flag according to the total length of the protocol.
    3. Determine whether the general agreement is complete according to the checksum.
    4. Obtain the name of the sub-protocol (interface) and the data content of the sub-protocol (interface) by deserializing the general protocol.
    5. According to the compression and encryption fields in the general protocol, determine whether to decompress or decrypt the data content of the sub-protocol (interface).
	6. Deserialize the data content of the sub-protocol according to the protobuf format of the sub-protocol to obtain the complete sub-protocol (interface) request conten