---
title: PHP 动态调用类中的方法
lastUpdated: 2024-01-19 09:21:30
---

## 使用 `call_user_func` 函数
PHP中提供了 `call_user_func` 函数用于动态调用类方法。
```php
call_user_func(array($object, $methodName), $arg1, $arg2, ...)
```
其中，`$object` 为类的实例化对象，`$methodName` 为要调用的方法名，$arg1, $arg2, ...为方法所需要的参数。
```php
class User {

    public function getName($id){
        return "name".$id;
    }
}

$user = new User();
$name = call_user_func(array($user, 'getName'), 100);
echo $name;
```
输出结果：
```php
name100
```
## 使用 `call_user_func_array` 函数
与 `call_user_func` 函数类似，PHP中也提供了 `call_user_func_array` 函数用于动态调用类方法，并且可以通过一个数组来传递参数。
```php
call_user_func_array(array($object, $methodName), $arguments)
```
其中，`$object` 为类的实例化对象，`$methodName` 为要调用的方法名，`$arguments` 为一个数组，包含方法所需要的参数。
```php
class User {

    public function getName($id, $type){
        return "name".$id."-".$type;
    }
}

$user = new User();
$name = call_user_func_array(array($user, 'getName'), array(100, 'vip'));
echo $name;
```
输出结果：
```php
name100-vip
```
## 使用可变函数名称
PHP中一个较为简单的方法是使用可变函数名称来动态调用类方法。
```php
$object->$methodName($arg1, $arg2, …)
```
其中，`$object` 为类的实例化对象，`$methodName` 为要调用的方法名称，$arg1, $arg2, …为方法所需要的参数。
```php
class User {

    public function getName($id){
        return "name".$id;
    }
}

$user = new User();
$name = $user->getName(100);
echo $name;
```
输出结果：
```php
name100
```
## 使用反射机制
在 PHP 中，可以使用反射机制来动态地调用类中的方法。
```php
<?php
class HelloWorld
{
    public function helloTo($name)
    {
        return 'Hello ' . $name;
    }
}
$reflectionMethod = new ReflectionMethod('HelloWorld', 'helloTo');


//调用反射的方法并将其参数作为数组传递
echo $reflectionMethod->invokeArgs(new HelloWorld(), array('LUFUHU')); 


//结果：Hello  LUFUHU
```
