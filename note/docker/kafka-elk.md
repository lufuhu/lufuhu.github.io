---
title: Kafka+ELK
lastUpdated: 2023-11-23 18:14:38
---

## 环境

环境： `linux` `docker`, 内存 `3G` 以上

## 安装

> 主机IP: 192.168.33.234 （注意替换下面命令中的ip）

### kafka

``` sh
docker run -d --name zookeeper --publish 2181:2181 --volume /etc/localtime:/etc/localtime --restart=always wurstmeister/zookeeper

docker run -d --name kafka --publish 9092:9092 --link zookeeper:zookeeper --env KAFKA_BROKER_ID=100 --env HOST_IP=192.168.33.234 --env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 --env KAFKA_ADVERTISED_HOST_NAME=192.168.33.234 --env KAFKA_ADVERTISED_PORT=9092 --restart=always --volume /etc/localtime:/etc/localtime wurstmeister/kafka

docker run -d --name kafka-manager --link zookeeper:zookeeper --link kafka:kafka -p 9000:9000 --restart=always --env ZK_HOSTS=zookeeper:2181 sheepkiller/kafka-manager
```

broker: 192.168.33.234:9092
kafka-manager: <http://192.168.33.234:9000>

### elasticsearch

``` sh
docker pull elasticsearch:7.16.3
docker pull logstash:7.16.2
docker pull kibana:7.16.3

docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.16.2

docker run -d --name kibana -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://192.168.33.234:9200" -e "I18N_LOCALE=zh-CN" kibana:7.16.3

logstash测试
# `/pipeline/` 存放配置文件 kafka-es.conf
docker run -it -v /pipeline/:/usr/share/logstash/pipeline/ logstash:7.16.3：
logstash运行
docker run -d --name logstash -v /pipeline/:/usr/share/logstash/pipeline/ logstash:7.16.3

docker run -p 9100:9000 lmenezes/cerebro
```
`kafka-es.conf`
```
input {
    kafka {
        bootstrap_servers => ["192.168.33.234:9092"]
        group_id => "es-transfer"
        topics => ["logger"]
        consumer_threads => 5
        decorate_events => true
        codec => "json"
        }
}
output {
    elasticsearch {
        hosts => ["192.168.33.234:9200"]
        index => "test_kafka"
        codec => "json"
   }
}
```
> 报错：max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]，执行命令：sysctl -w vm.max_map_count=262144

API： <http://192.168.33.234:9200>
Kibana: <http://192.168.33.234:5601>
Cerebro：<http://192.168.33.234:9100>

## 使用

``` sh
查看所有索引
http://192.168.33.234:9200/_cat/indices?v&pretty

查看索引 `test_kafka` 下的内容
http://192.168.33.234:9200/test_kafka/_search?size=50&sort=@timestamp:desc
```
