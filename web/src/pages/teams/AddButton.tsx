import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, PureComponent } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface States {
  isOpen: boolean;
  name: string;
}

interface Props {
  createTeam(payload: object): void;
}

class AddButton extends PureComponent<Props, States> {
  public state = {
    isOpen: false,
    name: "",
  };

  public render() {
    const { isOpen, name } = this.state;
    return (
      <Fragment>
        <Button type="button" color="primary" onClick={this.onToggle}>
          <FontAwesomeIcon icon="plus" className="plus-icon" />
          <span>조직 추가</span>
        </Button>
        <CreateTeamModal
          isOpen={isOpen}
          name={name}
          onToggle={this.onToggle}
          onClosed={this.onClosed}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Fragment>
    );
  }

  private onToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  private onChange = (e: React.ChangeEvent) => {
    e.stopPropagation();
    const { id, value }: any = e.target;
    this.setState({
      [id]: value,
    } as Pick<States, keyof States>);
  }

  private onClosed = () => {
    this.setState({
      name: "",
    });
  }

  private onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { createTeam } = this.props;
    const { name } = this.state;
    await createTeam({ name });
    this.setState({ isOpen: false });
  }
}

interface CreateTeamModalProps {
  isOpen: boolean;
  name: string;
  onChange(e: React.ChangeEvent): void;
  onToggle(): void;
  onClosed(): void;
  onSubmit(e: React.FormEvent): void;
}
const CreateTeamModal = ({
  isOpen,
  onToggle,
  onChange,
  onClosed,
  onSubmit,
  name,
}: CreateTeamModalProps) => (
  <Modal isOpen={isOpen} toggle={onToggle} onClosed={onClosed} size="sm">
    <ModalHeader toggle={onToggle}>팀 추가</ModalHeader>
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>팀 이름</Label>
          <Input id="name" type="text" placeholder="팀 이름 입력" onChange={onChange} value={name} />
        </FormGroup>
        <ModalFooter>
          <Button color="primary" type="submit">생성</Button>
          <Button color="secondary" onClick={onToggle}>취소</Button>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
);

export default AddButton;
