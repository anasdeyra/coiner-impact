import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import prisma from "@db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    // List of posts
    const posts = await prisma.article.findMany({ select: { title: true } });

    // Create each URL row
    posts.forEach((post) => {
      smStream.write({
        url: `/post/${post.title.toString().replaceAll(" ", "-")}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // add manual
    smStream.write({
      url: `/`,
      changefreq: "daily",
      priority: 0.9,
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
