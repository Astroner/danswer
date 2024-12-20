import { getSourceMetadataForSources } from "@/lib/sources";
import { ValidSources } from "@/lib/types";
import { Persona } from "../admin/assistants/interfaces";
import { Divider } from "@tremor/react";
import { FiBookmark, FiInfo } from "react-icons/fi";
import { HoverPopup } from "@/components/HoverPopup";

import cn from "./ChatIntro.module.scss";

import brainPNG from "./icons/brain.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { buildChatUrl } from "./lib";

export function ChatIntro({
  availableSources,
  selectedPersona,
  availablePersonas,
}: {
  availableSources: ValidSources[];
  selectedPersona: Persona;
  availablePersonas: Persona[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams()

  const availableSourceMetadata = getSourceMetadataForSources(availableSources);

  const select = (assistant: Persona) => {
    if (assistant.id !== selectedPersona.id) {
      
      router.push(buildChatUrl(searchParams, null, assistant.id));
    }
  }

  return (
    <div className={cn.header}>
      <div className={cn.logo}>
            <Image src={brainPNG} alt="" />
          </div>
          <h1>
            Which assistant do you want to chat with today?
          </h1>
          <p>
            Or ask a question immediately to use Neolaw assistant.
          </p>
          <div className={cn.assistants}>
            {availablePersonas.map(persona => (
              <div key={persona.id} className={selectedPersona.id === persona.id ? cn['assistant--selected'] : cn['assistant--default']} onClick={() => select(persona)}>
                <h3>{persona.name}</h3>
                <p>{persona.description}</p>
              </div>
            ))}
        </div>
    </div>
  )

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="mobile:w-[90%] mobile:px-4 w-message-xs 2xl:w-message-sm 3xl:w-message">
          <div className="flex">
            <div className="mx-auto">
              <div className="m-auto text-3xl font-strong font-bold text-strong w-fit">
                {selectedPersona?.name || "How can I help you today?"}
              </div>
              {selectedPersona && (
                <div className="mt-1">
                {selectedPersona.description}
                </div>
              )}
            </div>
          </div>
          {selectedPersona && selectedPersona.num_chunks !== 0 && (
            <>
              <Divider />
              <div>
                {selectedPersona.document_sets.length > 0 && (
                  <div className="mt-2">
                    <p className="font-bold mb-1 mt-4 text-emphasis">
                      Knowledge Sets:{" "}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPersona.document_sets.map((documentSet) => (
                        <div key={documentSet.id} className="w-fit">
                          <HoverPopup
                            mainContent={
                              <span className="flex w-fit p-1 rounded border border-border text-xs font-medium cursor-default">
                                <div className="mr-1 my-auto">
                                  <FiBookmark />
                                </div>
                                {documentSet.name}
                              </span>
                            }
                            popupContent={
                              <div className="flex py-1 w-96">
                                <FiInfo className="my-auto mr-2" />
                                <div className="text-sm">
                                  {documentSet.description}
                                </div>
                              </div>
                            }
                            direction="top"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {availableSources.length > 0 && (
                  <div className="mt-1">
                    <p className="font-bold mb-1 mt-4 text-emphasis">
                      Connected Sources:{" "}
                    </p>
                    <div className={`flex flex-wrap gap-2`}>
                      {availableSourceMetadata.map((sourceMetadata) => (
                        <span
                          key={sourceMetadata.internalName}
                          className="flex w-fit p-1 rounded border border-border text-xs font-medium cursor-default"
                        >
                          <div className="mr-1 my-auto">
                            {sourceMetadata.icon({})}
                          </div>
                          <div className="my-auto">
                            {sourceMetadata.displayName}
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
