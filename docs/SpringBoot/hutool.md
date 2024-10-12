## 练习 1：读取自定义配置文件并生成二维码
**目标**：结合 Spring Boot 的配置文件管理功能，使用 Hutool 工具库生成二维码。

**步骤**：

1. 添加依赖

```xml
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-all</artifactId>
  <version>5.8.11</version> <!-- 根据最新版本调整 -->
</dependency>

<dependency>
  <groupId>com.google.zxing</groupId>
  <artifactId>core</artifactId>
  <version>3.5.2</version>
</dependency>
```

2. 在 `application.yml` 或 `application.properties` 中定义一个自定义配置项，用于存储要生成二维码的信息，例如 URL 或文本。

```yaml
custom:
  qrcode:
    content: "https://www.baidu.com"
```

3. 在 Spring Boot 中，使用 `@Value` 注解读取这个自定义配置项。
4. 使用 Hutool 的 `QrCodeUtil` 工具类，根据配置生成二维码并保存为本地图片。

**代码示例**：

```java
import cn.hutool.extra.qrcode.QrCodeUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class QrCodeService {

    @Value("${custom.qrcode.content}")
    private String qrContent;

    public void generateQrCode() {
        QrCodeUtil.generate(qrContent, 300, 300, new File("qrcode.png"));
        log.info("二维码生成成功！");
    }
}
```

```java
@RestController
@AllArgsConstructor
public class QrCodeController {
    private final QrCodeService qrCodeService;

    @GetMapping("/qrcode")
    public void qrcode() {
        qrCodeService.generateQrCode();
    }
}
```

4. 接口测试：

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727059608255-cc1e5a07-b4e6-43e3-a7d2-964d15c0df7c.png)

扫码可以跳转到百度首页。

## 练习 2：自动读取配置文件生成日志
**目标**：通过 Spring Boot 的配置文件管理与 Hutool 的日志工具结合，自动配置日志级别并打印日志。

**步骤**：

1. 在 `application.yml` 中定义日志级别配置。

```yaml
custom:
  qrcode:
    content: "https://www.baidu.com"
  log:
    level: "INFO"
```

2. 使用 `@Value` 注解读取日志级别。
3. 使用 Hutool 的 `Log` 工具，根据配置动态设置日志级别并输出日志。

**代码示例**：

```java
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LogService {

    @Value("${custom.log.level}")
    private String logLevel;

    private final Log log = LogFactory.get();

    public void logMessage() {
        log.info("当前日志级别为: " + logLevel);
        if ("DEBUG".equalsIgnoreCase(logLevel)) {
            log.debug("这是调试信息");
        } else if ("INFO".equalsIgnoreCase(logLevel)) {
            log.info("这是普通信息");
        }
        // 其他级别的日志处理
    }
}
```

```java
@RestController
@AllArgsConstructor
public class LogController {
    private final LogService logService;

    @GetMapping("/log")
    public void logMsg() {
        logService.logMessage();
    }
}
```

4. 接口测试：

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727059894705-e6d03816-1ae3-426e-afe5-b0791f05ad38.png)

## 练习 3：自动备份配置文件
**目标**：使用 Hutool 的 IO 工具类，实现从 Spring Boot 读取配置文件后，自动备份这些配置文件。

**步骤**：

1. 在 `application.yml` 中定义文件备份路径。

```yaml
custom:
  qrcode:
    content: "https://www.baidu.com"
  log:
    level: "INFO"
  backup:
    location: /Users/moqi/Desktop/log/backup.log
```

在对应的路径，准备 backup.log 文件如下：

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727060308029-2f8720c6-642e-4578-a8ef-48bc5e50d387.png)

2. 通过 `@Value` 注解读取 `application.yml` 或 `application.properties` 的路径。
3. 使用 Hutool 的 `FileUtil` 工具类，在项目启动时，自动备份配置文件到指定的备份目录。

**代码示例**：

```java
import cn.hutool.core.io.FileUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@Slf4j
public class ConfigBackupService {

    @Value("${custom.backup.location}")
    private String configFilePath;

    @PostConstruct
    public void backupConfigFile() {
        File configFile = new File(configFilePath);
        if (configFile.exists()) {
            File backupFile = new File("backup/" + configFile.getName());
            FileUtil.copy(configFile, backupFile, true);
            log.info("配置文件已备份到：{}", backupFile.getPath());
        }
    }
}
```

```java
import com.example.demo.service.ConfigBackupService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ConfigBackupController {
    private final ConfigBackupService configBackupService;

    @GetMapping("/backup")
    public void backupConfig() {
        configBackupService.backupConfigFile();
    }
}
```

3. 接口测试：

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727060528441-7efaa3e5-1cda-4e03-9b53-13e11a76a2b1.png)

## 练习 4：读取文件内容并发送邮件
**目标**：使用 Hutool 读取文本文件内容，并通过 Spring Boot 配置的邮件服务发送文件内容作为邮件。

**步骤**：

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

2. 在 `application.yml` 中配置邮件发送信息。

```yaml
spring:
  mail:
    host: smtp.qq.com
    username: 16422802@qq.com
    password: feeeuwrdnvrtbjhd
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true
```

3. 使用 Hutool 的 `FileUtil` 读取文件内容。
4. 使用 Spring Boot 提供的邮件 API，通过 Hutool 读取的内容发送邮件。

**代码示例**：

```java
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Resource
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        // 发件人邮箱
        message.setFrom(from);
        // 收件人邮箱
        message.setTo(to);
        // 邮件主题
        message.setSubject(subject);
        // 邮件内容
        message.setText(body);
        // 发送邮件
        mailSender.send(message);
        log.info("邮件已发送！");
    }
}
```

```java
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mail {
    private String to;
    private String subject;
    private String body;
}
```

```java
import com.example.demo.entity.Mail;
import com.example.demo.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @GetMapping("/mail")
    public void sendEmail(@RequestBody Mail mail) {
        emailService.sendSimpleEmail(mail.getTo(), mail.getSubject(), mail.getBody());
    }
}
```

5. 接口测试，注意要传递 JSON 请求体，所以用 POST 请求。

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727061767167-cc5be833-87df-41a6-8629-dc095a539f94.png)

查看邮箱

![](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1727061824363-0384dad9-fe31-4e37-86ab-09a6bfb1b42e.png)

