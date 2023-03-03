# Meet the Music

This project was built for the 2023 Flow Hackathon with a special Thank You to the teams at Next.js, Flow Blockchain, Dapper Wallet, Niftory, and Riffusion.

## Tech Stack

- Web Framework: [Next.js](https://nextjs.org/)
- Auth Framework: [NextAuth](https://next-auth.js.org/)
- Graph QL Client: [graphql-request](https://github.com/prisma-labs/graphql-request)
- React Management: [urql](https://formidable.com/open-source/urql/) and [SWR](https://swr.vercel.app/docs/with-nextjs)
- GraphQL: [graphql-codeg-generator](https://www.graphql-code-generator.com/)
- UI Framework: [Chakra UI](https://chakra-ui.com/)
- Model [Stable Diffusion](https://stability.ai)
- Programing [Python](https://www.python.org)
- Virtual Python Environment [Conda](https://docs.conda.io/)
- Local Model Hosting [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- Cloud Computing [Google Colaboratory](https://colab.research.google.com/)
- Cloud Deployment [Hugging Face](https://huggingface.co)
- Demo Hosting [Gradio](https://gradio.app/o)
- Audio Formats [FFmpeg](https://ffmpeg.org/download.html)
- Local Dev Environment [PyTorch](pytorch.org)
- Local Dev Environment [CUDA](https://developer.nvidia.com/cuda-11-6-0-download-archive)

## Quick Start

### Create .env file

cd to the root of the project

Create .env file

```
 touch .env
```

### Generate a Unique NEXTAUTH_SECRET

```
 openssl rand -base64 32
```

### Add your variables to the .env file

From Niftory: https://docs.niftory.com/
<br/>From Dapper Wallet: https://docs.meetdapper.com/developing-for-the-platform
<br/>NEXT_PUBLIC_API_KEY="insert_your_api_key_here"
<br/>NEXT_PUBLIC_CLIENT_ID="insert_your_client_id_here"
<br/>CLIENT_SECRET="insert_your_super_secret_client_secret_that_is_unique_to_your_app_DO_NOT_SHARE_OR_COMMIT"
<br/>NIFTORY_AUTH_ISSUER="https://auth.staging.niftory.com"
<br/>NEXT_PUBLIC_API_PATH="https://graphql.api.staging.niftory.com"
<br/>NEXTAUTH_URL="http://localhost:insert_your_port"
<br/>NEXTAUTH_SECRET="insert_your_secret_here"
<br/>NEXT_PUBLIC_FLOW_ACCESS_API="https://access-testnet.onflow.org"
<br/>NEXT_PUBLIC_WALLET_API="https://staging.accounts.meetdapper.com"
<br/>NEXT_PUBLIC_FLOW_SCAN_URL="https://testnet.flowscan.org"
<br/>NEXT_PUBLIC_NFT_ADDRESS="0x631e88ae7f1d7c20"
<br/>NEXT_PUBLIC_NIFTORY_ADDRESS="0x04f74f0252479aed"
<br/>NEXT_PUBLIC_REGISTRY_ADDRESS="0x6085ae87e78e1433"
<br/>NEXT_PUBLIC_MERCHANT_ACCOUNT_ADDRESS="insert_your_dapper_organization_address_here"
<br/>NEXT_PUBLIC_ENV="development"
<br/>NEXT_PUBLIC_VERCEL_URL="insert.your.public.application.url"
<br/>FLASK_URL="http://127.0.0.1:3013/run_inference" (only use if you are runing AI server locally)

### Install Dependencies

```
yarn install
```

### Start the development server

```
yarn dev
```

## AI Cloud Server

Follow instructions in my Google Colab page here: https://colab.research.google.com/drive/14ytufJVb_wUIk_bjCZ8PjidtO4OVdmnV#scrollTo=c-TJZ4p219yK

Deploy your model to Hugging Face with Gradio. View my deployment here: https://huggingface.co/spaces/goudastudios/text-to-music

Go to settings, then under "space hardware" select "T4 medium" or above to run the model. Switch back to the free CPU basic  space hardware when not demoing your model to save on costs. The T4 model costs about $1 an hour to run.

## AI Local Server

Use this if your computer has enough GPU to run Stable Diffusion locally.

Install python virtual environment

```
conda create --name riffusion python=3.9
conda activate riffusion
```

Install python dependencies

```
python -m pip install -r requirements.txt
```

Install ffmpeg

```
brew install ffmpeg
```

Test your CUDA-Torch availability

```
import torch
torch.cuda.is_available()
```

If using MPS on a mac wilapple silicon chips, test MPS availability

```
import torch
torch.backends.mps.is_available()
```

Run the model server

```
python -m riffusion.server --host 127.0.0.1 --port 3013
```
