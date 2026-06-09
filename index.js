if (type.includes("video")) {
  console.log("Video detected");
  score = await checkVideo(tempPath);
} else {
  console.log("Image detected");
  score = await checkImage(tempPath);
}
      const tempPath = path.join(__dirname, "temp_" + Date.now());

      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      } else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      if (score >= 0.45) {
        await message.delete().catch(() => {});
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      } else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      if (score >= 0.45) {
        await message.delete().catch(() => {});
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);  try {
    for (const file of message.attachments.values()) {

      const url = file.url;
      const type = file.contentType || "";

      const tempPath = path.join(__dirname, "temp_" + Date.now());

      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      } else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      if (score >= 0.45) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Runtime error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);      const type = file.contentType || "";

      const tempPath = path.join(__dirname, "temp_" + Date.now());

      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      // 🎥 فيديو
      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      }

      // 🖼️ صورة
      else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      // 🚫 حذف أقوى وأكثر حساسية
      if (score >= 0.45) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);  processing = true;

  try {
    for (const file of message.attachments.values()) {

      const url = file.url;
      const type = file.contentType || "";

      const tempPath = path.join(__dirname, "temp_" + Date.now());

      // تحميل الملف
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      // 🎥 فيديو
      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      }

      // 🖼️ صورة / أي شيء آخر
      else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      // 🚫 حذف إذا غير لائق
      if (score >= 0.6) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

      // 🧹 تنظيف الملف المؤقت
      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Runtime error:", err.message);
  }

  // 🔓 فتح القفل
  processing = false;
});

client.login(process.env.TOKEN);
