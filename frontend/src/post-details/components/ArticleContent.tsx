import React from 'react';

export default function ArticleContent() {
  return (
    <div className="prose-blog max-w-none mb-8">
      <h2>What Is a Large Language Model, Really?</h2>
      <p>
        Before we can appreciate the engineering behind modern AI systems, we need to strip away the
        mysticism. A large language model is, at its core, a function that takes a sequence of tokens
        as input and outputs a probability distribution over the next token. That's it. The magic — and
        the extraordinary capability — emerges from doing this at scale, with the right architecture.
      </p>
      <p>
        The transformer architecture, introduced by Vaswani et al. in the landmark 2017 paper
        "Attention Is All You Need," replaced recurrent networks with a mechanism called
        <strong> self-attention</strong>. This single change made it possible to process entire sequences
        in parallel rather than step-by-step, unlocking the computational efficiency that made billion-parameter
        models trainable on modern hardware.
      </p>

      <h2>The Attention Mechanism: A Visual Intuition</h2>
      <p>
        Imagine reading the sentence: "The trophy didn't fit in the suitcase because it was too big." To understand what"it" refers to, your brain doesn't process the sentence left-to-right in
        isolation — it looks back, weighs context, and resolves the ambiguity. Self-attention does
        exactly this, but for every token simultaneously.
      </p>
      <blockquote>
        Self-attention allows the model to relate different positions of a single sequence in order
        to compute a representation of that sequence. It's not just about the current word — it's
        about the entire context in which that word appears.
      </blockquote>
      <p>
        For each token, the model computes three vectors: a <strong>Query</strong> (what am I looking for?),
        a <strong>Key</strong> (what do I contain?), and a <strong>Value</strong> (what do I contribute?).
        The attention score between two tokens is the dot product of their Query and Key vectors, scaled
        and softmaxed. The output for each token is a weighted sum of all Value vectors.
      </p>

      <h2>Scaling Laws and Why Size Matters</h2>
      <p>
        The empirical insight that changed everything came from OpenAI's 2020 scaling laws paper:
        model performance improves predictably as you scale compute, data, and parameters — and
        the relationship follows a smooth power law. This meant that if you had enough compute,
        you could reliably predict how good your model would be before training it.
      </p>
      <pre>{`# Simplified scaling law (Chinchilla-style)
loss = A / (N^α) + B / (D^β) + C

# Where:
# N = number of parameters
# D = number of training tokens
# α, β ≈ 0.5 for most architectures
# C = irreducible entropy floor`}</pre>
      <p>
        The Chinchilla paper (Hoffmann et al., 2022) refined this further, showing that most large
        models were dramatically undertrained. GPT-3's 175 billion parameters should have been trained
        on roughly 3.5 trillion tokens, not 300 billion. This insight directly shaped how Llama 2,
        Mistral, and subsequent models were trained.
      </p>

      <h2>RLHF: Teaching Models to Be Helpful</h2>
      <p>
        Pretraining on raw internet text produces a model that can predict text — but not one that
        follows instructions or avoids harmful outputs. Reinforcement Learning from Human Feedback
        (RLHF) is the training pipeline that bridges this gap.
      </p>
      <p>The three-stage process works like this:</p>
      <ul>
        <li>
          <strong>Supervised Fine-Tuning (SFT):</strong> Human contractors write ideal responses to
          thousands of prompts. The model is fine-tuned on these demonstrations.
        </li>
        <li>
          <strong>Reward Model Training:</strong> Contractors rank multiple model outputs for the
          same prompt. A separate reward model learns to predict human preference scores.
        </li>
        <li>
          <strong>PPO Optimization:</strong> The language model is fine-tuned using Proximal Policy
          Optimization, maximizing the reward model's score while staying close to the SFT model
          (via a KL divergence penalty).
        </li>
      </ul>

      <h2>What Comes Next: MoE, Multimodality, and Beyond</h2>
      <p>
        The current frontier involves two major architectural bets. Mixture-of-Experts (MoE) models
        like GPT-4 and Mixtral route each token to only a subset of "expert" sub-networks, enabling
        massive parameter counts with sub-linear compute cost. Multimodal architectures like
        Gemini 1.5 and Claude 3 process images, audio, and text through a unified token stream,
        enabling genuinely cross-modal reasoning.
      </p>
      <p>
        The engineering challenge is no longer primarily about the model architecture — it's about
        inference infrastructure, context window efficiency, and the subtle alignment problems that
        emerge when capable models interact with millions of users simultaneously.
      </p>
    </div>
  );
}