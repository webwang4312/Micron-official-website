---
sidebar_position: 1
---




This chapter mainly introduces the hardware requirements, development environment, and how to get the source code to compile and run as a blockchain developer.  

### Hardware requirements:
* CPU: Four cores (Minimum one cores)
* Memory: 4G
* Disk: At least 50G


### Operating system:
  * CentOS 7 (a free, open source, and redistributable open source operating system) and CentOS (Community Enterprise Operating System) is one of the Linux distributions.

### Development environment:
#### 1. Upgrade your gcc compiler to 8.3.1:

gcc is a set of compilers developed by the GNU project that supports multiple programming languages.
GCC is a famous example in the development of free software, and is released by the Free Software Foundation under the GPL agreement.
GCC is the standard compiler for most Unix-like operating systems (such as Linux, BSD, Mac OS X, etc.).
GCC is also applicable to Microsoft Windows. GCC supports a variety of computer system chips, such as x86, ARM, and has been ported to a variety of other hardware platforms.

```
 yum install centos-release-scl scl-utils-build   
 yum install -y devtoolset-8-toolchain
 scl enable devtoolset-8 bash
```
Check whether the upgrade is successful.
```
 gcc --version
```

#### 2.  View, close, open the system firewall
The so-called "firewall" refers to a method of separating the intranet from the public access network (such as the Internet).
It is actually an applied security technology and isolation technology based on modern communication network technology and information security technology.
It is increasingly being used in the interconnected environment of private and public networks, especially when accessing the Internet.
```
sudo systemctl status firewalld  
systemctl stop firewalld.service  
systemctl start firewalld.service 
```

#### 3.  git installation:  
Git is an open source distributed version control system that can efficiently and quickly handle version management from very small to very large projects.
##### (1).Delete the old version of git 
Execute:
```
yum  remove git。
```

##### (2).Online installation  
 
```
yum install git 
```

### Get the UENC source code
```
git clone https://github.com/uenctech/uenc_src
```
###  Compile and run
 ##### Install dependent libraries:
``` 
 yum install -y zlib zlib-devel  
 yum install -y unzip zip  
 yum install -y autoconf automake libtool
 
```     
Execute make to start compiling. When compiling, it prompts that libprotobuf.a: There is no such file or directory, delete the protobuf directory and recompile.
After compiling, the executable file ebpc_xxxxx_testnet will be generated.  
 ### Introduction of files and directories generated at runtime:
Run the program  
 ```
 ./ebpc_xxxxx_testnet
 ```
 
 After the program is running, press Ctrl+C to exit. Cert will be generated.
Directory and config.json, data.db, devpwd.json, log.txt files. These directories and files are:

  | File or directory |     Description     | 
 | :--------: | :--------------: | 
 |   cert   | Stores the generated public-private key pair. The file with the extension ".public.key" is the public key file, while the file with the extension ".private.key" is the private key file. | 
 |   data.db   | Database file. | 
 |   devpwd.json   | The local access password hash value. When the mobile terminal connects, use the password to connect. | 
 |   config.json   | Configuration file. | 
 |   log.txt   | Log file. | 
 
   * Modify config.json
   
     Your own node is a subnet node without configuration which can run directly according to the default configuration. If it is a public network node, configure as follows.

1. The value of is_public_node needs to be changed from false to true.
 2. Set the value of the IP field in the server to the IP address of other public network nodes connected to your own node.
 3. Set the local_ip field under the var field to the external network IP address of your own node.

For example, if the external IP address of its own node is xxx.xxx.xxx.xxx, and the connected public network address is yyy.yyy.yyy.yyy, then configure as follows (take the test network public network node configuration as an example).

```
"is_public_node": true,
    "server": [
        {
            "IP": "yyy.yyy.yyy.yyy",
            "PORT": 11188
        },
    ],
    "var": {
    "k_bucket": "a0dbbd80eb84b9e51f3a0d69727384c651f9bdb5",
    "k_refresh_time": 100,
    "local_ip": "xxx.xxx.xxx.xxx",
    "local_port": 11188,
    "work_thread_num": 4
    },
```
### Introduction to runtime parameters:   
You can take parameters when the program is started. The parameters are:

|      Parameter |Description|
|:---:|:---:|  
|--help  |Get the help menu.|
|-m       |Show the menu.  |
|-s       |Set a mining fee.   |
|-p       |Set a packing fee. |  

Such as setting mining fee:
```
    ./uenc_1.3_testnet -s  0.015
```

 Note: Actual value = value * 0.000001. The minimum actual value: 0.000001.
 
#### Compile command：

make    Generate testnet program.

make primary   Generate the mainnet program.

When there is a problem with the compilation, you need to recompile.

 1. Delete the protobuf, crypto, rocksdb folders.

2. make clean

3. make or make primary