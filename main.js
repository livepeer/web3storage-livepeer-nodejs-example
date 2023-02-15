const LIVEPEER_ENDPOINT = "https://livepeer.studio"

const transcodeAndPoll = async (params) => {
  const taskID = await transcode(params);

  console.log(`Created transcode task ${taskID}`);

  const pollDelay = 10000; // ms
  const maxPolls = 100;
  for (let i = 0; i < maxPolls; i++) {
    const task = await getTask(taskID);
    if (task.status.phase == "completed") {
      const url = new URL(task.output.transcodeFile.baseUrl)
      console.log(
        `Transcode completed and results available at https://${url.host}.ipfs.w3s.link${params.outputs.hls.path}`
      );
      return;
    }

    console.log(
      `Transcode is in progress: ${task.status.progress ? task.status.progress : 0}`
    );

    await sleep(pollDelay);
  }

  console.error(`Transcode took too long, giving up`);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const transcode = async (params) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.API_KEY}`);
  headers.append("Content-Type", "application/json");

  const url = `${LIVEPEER_ENDPOINT}/api/transcode`;
  const resp = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  });
  const data = await resp.json();

  return data.id;
};

const getTask = async (id) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.API_KEY}`);
  headers.append("Content-Type", "application/json");

  const url = `${LIVEPEER_ENDPOINT}/api/task/${id}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await resp.json();

  return data;
};

const main = async () => {
  const input = {
    url: process.env.INPUT_FILE_URL,
  };
  const storage = {
    type: "web3.storage",
    credentials: {
      proof: process.env.DELEGATION_PROOF,
    },
  };
  const outputs = {
    hls: {
      path: "/",
    },
  };

  const params = {
    input,
    storage,
    outputs,
  };

  await transcodeAndPoll(params);
};

try {
  main();
} catch (err) {
  console.error(err);
}
